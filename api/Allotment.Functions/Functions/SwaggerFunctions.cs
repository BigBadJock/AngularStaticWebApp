using AzureFunctions.Extensions.Swashbuckle;
using AzureFunctions.Extensions.Swashbuckle.Attribute;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System.Net.Http;
using System.Threading.Tasks;

namespace AllotmentFunctions.Functions
{
    public class SwaggerFunctions
    {
        [FunctionName("Swagger")]
        [SwaggerIgnore]
        public static Task<HttpResponseMessage> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "Swagger/json")] HttpRequestMessage req,
            ILogger log,
            [SwashBuckleClient] ISwashBuckleClient swashBucklerClient)
        {
            return Task.FromResult(swashBucklerClient.CreateSwaggerJsonDocumentResponse(req));
        }

        [FunctionName("SwaggerUI")]
        [SwaggerIgnore]
        public static Task<HttpResponseMessage> RunUI(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "Swagger/ui")] HttpRequestMessage req,
            ILogger log,
            [SwashBuckleClient] ISwashBuckleClient swashBuckleClient)
        {
            return Task.FromResult(swashBuckleClient.CreateSwaggerUIResponse(req, "swagger/json"));
        }
    }
}
