export class AvailableAmoutCampaigns {
  public addCampaignsAmount(
    numberCampaignsAdd: number,
    numberCampaignsCurrent: number,
  ): number {
    return Number(numberCampaignsAdd) + Number(numberCampaignsCurrent);
  }
  public subtractCampaignAmount(quantity: number, send: number): number {
    return Number(quantity) - Number(send);
  }
}
