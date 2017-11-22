using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json;
using Xamarin.Forms;

namespace MyTask
{


    public partial class Tasks : ContentPage
    {
        Del gesture;
        public Tasks(object o)
        {
            gesture = (Del)o;

            InitializeComponent();
            Debug.WriteLine("App Fim: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss.ffff"));

            init();

        }




        private void init()
        {

            GetPlacesAsync();


            myList.ItemSelected += OnMenuItemSelected;

        }


        private async void OnMenuItemSelected(object sender, SelectedItemChangedEventArgs e)
        {
            try
            {
                var item = (Task)e.SelectedItem;
                if (item != null)
                {
                    Debug.WriteLine("Navegação de Paginas Inicio: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss.ffff"));
                    await this.Navigation.PushAsync(new Details(item, gesture));


                }
                myList.SelectedItem = null;
            }
            catch
            {
            }

        }


        public async void GetPlacesAsync()
        {
            progress.IsRunning = true;
            progress.IsVisible = true;
            progress.IsEnabled = true;
            myList.IsVisible = false;

            var client = new HttpClient();
            string placesJson = "";
            try
            {
                Debug.WriteLine("Conectar Inicio: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss.ffff"));
                var response = await client.GetAsync("http://mdta-com-br.umbler.net/api");
                Debug.WriteLine("Conectar Fim: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss.ffff"));
                placesJson = response.Content.ReadAsStringAsync().Result;
            }
            catch
            {

            }




            //Debug.WriteLine(placesJson);

            if (placesJson != null && !placesJson.Equals(""))
            {
                Debug.WriteLine("Json to object Inicio: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss.ffff"));
                List<Task> list = JsonConvert.DeserializeObject<List<Task>>(placesJson);
                Debug.WriteLine("Json to object Fim: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss.ffff"));

                Debug.WriteLine("Object to json Inicio: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss.ffff"));
                JsonConvert.SerializeObject(list);
                Debug.WriteLine("Object to json Fim: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss.ffff"));

                myList.ItemsSource = list;
                progress.IsRunning = false;
                progress.IsVisible = false;
                progress.IsEnabled = false;
                myList.IsVisible = true;

                Debug.WriteLine("Armazenar Tarefas Inicio: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss.ffff"));
                App.Current.Properties["list"] = placesJson;
                Debug.WriteLine("Armazenar Tarefas Fim: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss.ffff"));

            }
            else
            {
                if (App.Current.Properties.ContainsKey("list"))
                {
                    Debug.WriteLine("Ler Tarefas Inicio: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss.ffff"));
                    string result = (String)App.Current.Properties["list"];
                    Debug.WriteLine("Ler Tarefas Fim: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss.ffff"));
                    //Debug.WriteLine("---> " + result);

                    if (result != null && !result.Equals(""))
                    {
                        List<Task> list = JsonConvert.DeserializeObject<List<Task>>(result);
                        myList.ItemsSource = list;
                    }

                    progress.IsRunning = false;
                    progress.IsVisible = false;
                    myList.IsVisible = true;
                }

            }



        }

    }
}
