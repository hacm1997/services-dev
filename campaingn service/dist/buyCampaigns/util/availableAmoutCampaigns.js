"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailableAmoutCampaigns = void 0;
class AvailableAmoutCampaigns {
    addCampaignsAmount(numberCampaignsAdd, numberCampaignsCurrent) {
        return Number(numberCampaignsAdd) + Number(numberCampaignsCurrent);
    }
    subtractCampaignAmount(quantity, send) {
        return Number(quantity) - Number(send);
    }
}
exports.AvailableAmoutCampaigns = AvailableAmoutCampaigns;
//# sourceMappingURL=availableAmoutCampaigns.js.map