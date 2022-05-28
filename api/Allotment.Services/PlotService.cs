using Allotment.Data.Interfaces;
using Allotment.Models;
using Allotment.Services.Interfaces;
using Core.Common;
using Core.Common.DataModels;
using Microsoft.Extensions.Logging;
using REST_Parser.Models;
using System;

namespace Allotment.Services
{
    public class PlotService : BaseDataService<Plot>, IPlotService
    {
        IPlotsWithRentalsViewRepository plotsWithRentalsRepository;
        IPlotRentalHistoryViewRepository plotRentalHistoryViewRepository;

        public PlotService(
            IPlotRepository repository, 
            IPlotsWithRentalsViewRepository plotsWithRentalsRepository,  
            IPlotRentalHistoryViewRepository plotRentalHistoryViewRepository,
            ILogger<Plot> logger) : base(repository, logger)
        {
            this.repository = repository;
            this.plotsWithRentalsRepository = plotsWithRentalsRepository;
            this.plotRentalHistoryViewRepository = plotRentalHistoryViewRepository;
            this.logger = logger;
        }

        public ApiResult<PlotRentalHistoryView> GetPlotRentalHistory(string restQuery)
        {
            try
            {
                this.logger.LogInformation($"DataService: {this.GetType().Name} searching PlotRentalHistory using restQuery ${restQuery}");
                return this.plotRentalHistoryViewRepository.GetAll(restQuery);
            }
            catch(Exception ex)
            {
                this.logger.LogError($"DataService: {this.GetType().Name} error searching using restQuery: ${ex.Message}");
                throw;
            }
            finally
            {
                this.logger.LogInformation($"DataService: {this.GetType().Name} exiting searching using restQuery ${restQuery}");
            }
        }

        public ApiResult<PlotsWithRentalsView> GetPlotsWithRentals(string restQuery)
        {
            try
            {
                this.logger.LogInformation($"DataService: {this.GetType().Name} searching using restQuery ${restQuery}");
                return this.plotsWithRentalsRepository.GetAll(restQuery);
            }
            catch (Exception ex)
            {
                this.logger.LogError($"DataService: {this.GetType().Name} error searching using restQuery: ${ex.Message}");
                throw;
            }
            finally
            {
                this.logger.LogInformation($"DataService: {this.GetType().Name} exiting searching using restQuery ${restQuery}");
            }


        }
    }
}
