using System;
using Newtonsoft.Json;

namespace MyTask
{
	public class Task
	{
		[JsonProperty(PropertyName = "title")]
		public string titulo { get; set; }

		[JsonProperty(PropertyName = "description")]
		public string descricao { get; set; }

		[JsonProperty(PropertyName = "start_date")]
		public string dataInicio { get; set; }

		[JsonProperty(PropertyName = "end_date")]
		public string dataFim { get; set; }

		[JsonProperty(PropertyName = "img")]
		public string imagem { get; set; }


		public string inicio
		{
			get { return "Inicio " + dataInicio; }
		}

		public string fim
		{
			get { return "Fim " + dataFim; }
		}

	}
}
