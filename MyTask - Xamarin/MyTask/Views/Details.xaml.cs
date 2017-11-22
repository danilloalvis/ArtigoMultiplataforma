using System;
using System.Collections.Generic;
using System.Diagnostics;
using FFImageLoading;
using FFImageLoading.Forms;
using Newtonsoft.Json;
using Plugin.Messaging;
using Xamarin.Forms;

namespace MyTask
{
	public partial class Details : ContentPage
	{
		Del handle;
		public Details(Object o, Object i)
		{
			InitializeComponent();
			Debug.WriteLine("Navegação de Paginas Fim: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss.ffff"));

			handle = (Del)i;
			handle(false);

			NavigationPage.SetHasBackButton(new MyTaskPage(), true);
			NavigationPage.SetBackButtonTitle(new MyTaskPage(), "voltar");

			Task task = o as Task;
			lb_title.Text = task.titulo;
			lb_descrition.Text = task.descricao;
			lb_dateInicio.Text = task.dataInicio;
			lb_dateFim.Text = task.dataFim;

			if (task.imagem != null && !task.imagem.Equals(""))
			{
				image.LoadingPlaceholder = "load.png";
				image.ErrorPlaceholder = "fail.png";
				image.Source = "http://mdta-com-br.umbler.net" + task.imagem;
			}
			else
			{
				image.IsVisible = false;
			}

			try
			{

				mail.Clicked += async delegate
				{
					var emailTask = MessagingPlugin.EmailMessenger;
					if (emailTask.CanSendEmail)
					{
						string json = JsonConvert.SerializeObject(task);
						// Send a more complex email with the EmailMessageBuilder fluent interface.
						var email = new EmailMessageBuilder()
						  .Subject("Task")
						  .Body(json)
						  .Build();
						emailTask.SendEmail(email);
					}
					else
					{
						await DisplayAlert("Erro", "Nenhuma Aplicativo de E-Mail disponivel", "Ok");
					}
				};
			}
			catch
			{
			}
		}



		async void OnPreviousPageButtonClicked(object sender, EventArgs e)
		{
			await Navigation.PopAsync();
		}

		protected override void OnDisappearing()
		{
			Debug.WriteLine("voltou!!!");
			handle(true);
			base.OnDisappearing();
		}


		protected override bool OnBackButtonPressed()
		{

			return base.OnBackButtonPressed();
		}


	}
}
