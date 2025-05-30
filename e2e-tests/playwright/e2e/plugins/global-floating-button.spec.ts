import { test } from "@playwright/test";
import { Common } from "../../utils/common";
import { FabPo } from "../../support/pageObjects/global-fab-po";
import { UIhelper } from "../../utils/ui-helper";
import { PagesUrl } from "../../support/pageObjects/page";

test.describe("Test global floating action button plugin", () => {
  // TODO: fix https://issues.redhat.com/browse/RHIDP-6492 and remove the skip
  test.skip(() => process.env.JOB_NAME.includes("operator"));

  let uiHelper: UIhelper;
  let fabHelper: FabPo;

  test.beforeEach(async ({ page }) => {
    const common = new Common(page);
    await common.loginAsGuest();

    uiHelper = new UIhelper(page);
    fabHelper = new FabPo(page, "/" as PagesUrl);
  });

  test("Check if Git and Bulk import floating buttons are visible on the Home page", async () => {
    await uiHelper.openSidebar("Home");
    await fabHelper.verifyFabButtonByLabel("Git");
    await fabHelper.verifyFabButtonByDataTestId("bulk-import");
    await fabHelper.clickFabMenu();
    await uiHelper.verifyText("Added repositories");
  });

  test("Check if floating button is shown with two sub-menu actions on the Catalog Page", async () => {
    await uiHelper.openSidebar("Catalog");
    await fabHelper.verifyFabButtonByDataTestId("floating-button-with-submenu");
    await fabHelper.clickFabMenu();
    await fabHelper.verifyFabButtonByLabel("Git");
    await fabHelper.clickFabMenu();
    await fabHelper.verifyPopup(
      "GitHub - redhat-developer/rhdh: The repo formerly known as janus-idp/backstage-showcase",
    );
    await fabHelper.switchTab();
    await fabHelper.verifyFabButtonByLabel("Quay");
    await fabHelper.clickFabMenu();
    await fabHelper.verifyPopup("Quay Container Registry · Quay");
  });
});
