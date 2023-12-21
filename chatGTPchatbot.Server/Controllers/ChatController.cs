using Microsoft.AspNetCore.Mvc;
using OpenAI_API;
using OpenAI_API.Completions;
using Swashbuckle.AspNetCore.Annotations;

namespace chatGTPchatbot.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public ChatController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        /// <summary>
        /// Get AI-based results for a given search text.
        /// </summary>
        /// <param name="SearchText">The text used as a prompt for AI completion.</param>
        /// <returns>The AI-generated completion text.</returns>
        [HttpPost]
        [SwaggerOperation(
            Summary = "Get AI-based results",
            Description = "Generates AI-based completion text for a given prompt."
        )]
        [SwaggerResponse(200, "AI completion text", typeof(string))]
        public async Task<IActionResult> GetAIBasedResults([FromBody] object SearchText)
        {
            string APIKey = _configuration["MySecretValues:Token"];
            string answer = string.Empty;

            var openai = new OpenAIAPI(APIKey);
            CompletionRequest completion = new CompletionRequest();
            completion.Prompt = SearchText.ToString();
            completion.Model = OpenAI_API.Models.Model.DavinciText;
            completion.MaxTokens = 200;

            var result = openai.Completions.CreateCompletionAsync(completion);
            foreach (var item in result.Result.Completions)
            {
                answer = item.Text;
            }

            return Ok(answer);
        }
    }
}
