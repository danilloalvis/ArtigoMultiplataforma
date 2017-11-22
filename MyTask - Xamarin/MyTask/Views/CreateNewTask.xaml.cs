using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Net.Http;
using Plugin.Media;
using Xamarin.Forms;

namespace MyTask
{
    public partial class CreateNewTask : ContentPage
    {
        Plugin.Media.Abstractions.MediaFile file;
        public CreateNewTask(Object o)
        {
            InitializeComponent();
            dateInicio = new DatePicker
            {
                Format = "dd/MM/yyyy",
                VerticalOptions = LayoutOptions.CenterAndExpand
            };

            dateFim = new DatePicker
            {
                Format = "dd/MM/yyyy",
                VerticalOptions = LayoutOptions.CenterAndExpand
            };

            capture.Clicked += async delegate
            {
                await CrossMedia.Current.Initialize();
                if (!CrossMedia.Current.IsCameraAvailable || !CrossMedia.Current.IsTakePhotoSupported)
                {
                    await DisplayAlert("Sem Camera", "Nenhuma camera disponivel", "Ok");
                    return;
                }

                file = await CrossMedia.Current.TakePhotoAsync(new Plugin.Media.Abstractions.StoreCameraMediaOptions
                {
                    SaveToAlbum = false

                });

                if (file == null)
                    return;

                image.Source = ImageSource.FromStream(() => file.GetStream());
                image.IsVisible = true;
            };


            procurar.Clicked += async delegate
            {
                if (!CrossMedia.Current.IsPickPhotoSupported)
                {
                    await DisplayAlert("Erro", "Não foi possivel abri a galeria de fotos", "OK");
                    return;
                }

                file = await CrossMedia.Current.PickPhotoAsync();
                if (file == null)
                    return;
                image.Source = ImageSource.FromStream(() => file.GetStream());
                image.IsVisible = true;
            };


            save_btn.Clicked += delegate
            {
                sequest();
            };

        }

        public static byte[] ReadFully(Stream input)
        {
            byte[] buffer = new byte[16 * 1024];
            using (MemoryStream ms = new MemoryStream())
            {
                int read;
                while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
                {
                    ms.Write(buffer, 0, read);
                }
                return ms.ToArray();
            }
        }

        public void Base64ToBitmap(String base64String)
        {
            Debug.WriteLine("Decode Base64 Inicio: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss.ffff"));
            byte[] imageAsBytes = Convert.FromBase64String(base64String);
            Debug.WriteLine("Decode Base64 Fim: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss.ffff"));
        }

        private async void sequest()
        {

            string url = "http://mdta-com-br.umbler.net/task";
            string result = String.Empty;
            string base64String;
            if (file != null)
            {
                Debug.WriteLine("Encode Base64 Inicio: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss.ffff"));
                base64String = Convert.ToBase64String(ReadFully(file.GetStream()));
                Debug.WriteLine("Encode Base64 Fim: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss.ffff"));
                Base64ToBitmap(base64String);
            }
            else
            {
                base64String = "";
            }

            Debug.WriteLine("Enviar Tarefa Inicio: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss.ffff"));
            using (var client = new HttpClient())
            {
                var content = new FormUrlEncodedContent(new[] {
             new KeyValuePair<string, string>("title", et_title.Text),
             new KeyValuePair<string, string>("description", et_descrition.Text),
             new KeyValuePair<string, string>("start_date", dateInicio.Date.ToString("dd/MM/yyyy")),
             new KeyValuePair<string, string>("end_date", dateFim.Date.ToString("dd/MM/yyyy")),
             new KeyValuePair<string, string>("img", base64String)

            });
                progress.IsRunning = true;
                progress.IsVisible = true;
                progress.IsEnabled = true;
                save_btn.IsVisible = false;
                body.IsVisible = false;

                using (var response = await client.PostAsync(url, content))
                {
                    using (var responseContent = response.Content)
                    {
                        result = await responseContent.ReadAsStringAsync();

                        progress.IsRunning = false;
                        progress.IsVisible = false;
                        progress.IsEnabled = false;
                        save_btn.IsVisible = true;
                        body.IsVisible = true;

                        Debug.WriteLine("Enviar Tarefa Fim: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss.ffff"));
                        Debug.WriteLine(result);

                        if (response.StatusCode == System.Net.HttpStatusCode.Created)
                        {
                            DisplayAlert("Sucesso!", "Tarefa salva com sucesso", "OK");
                        }
                        else
                        {
                            DisplayAlert("Erro!", "Falha ao tentar salvar a Tarefa", "OK");
                        }


                    }
                }
            }

        }

    }
}
