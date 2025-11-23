import { test, expect } from '@playwright/test';
import { Homepage } from '../pom/homepage';

test.describe('UITesting Playground suite', () => {
  let homepage: Homepage;

  test.beforeEach(async ({ page }) => {
    homepage = new Homepage(page);
    await page.goto('/');
  });

  test('Dynamic ID #1', async ({ page }) => {
    await homepage.sectionDynamicID.click();
    await page.getByRole('button', { name: 'Button with Dynamic ID' }).click();
  });

  test('Class Attribute #2', async ({ page }) => {
    await homepage.sectionClassAttribute.click();
    await page.once('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'Button' }).first().click();
  });

  test('Hidden Layers #3', async ({ page }) => {
    await homepage.sectionHiddenLayers.click();
    const hiddenLayerButton = page.getByRole('button', { name: 'Button' });
    await hiddenLayerButton.click();
    await expect(hiddenLayerButton.click()).rejects.toThrow();
  });

  test('Load Delay #4', async ({ page }) => {
    await homepage.sectionLoadDelay.click();
    await page.getByRole('button', { name: 'Button Appearing After Delay' }).click();
    await expect(page).toHaveURL(/loaddelay/);
  });

  test('AJAX Data #5', async ({ page }) => {
    await homepage.sectionAjaxData.click();
    await page.getByRole('button', { name: 'Button Triggering AJAX Request' }).click();
    await expect(page.getByText('Data loaded with AJAX get')).toBeVisible();
  });

  test('Client Side Delay #6', async ({ page }) => {
    await homepage.sectionClientSideDelay.click();
    await page.getByRole('button', { name: 'Button Triggering Client Side' }).click();
    await expect(page.getByRole('button', { name: 'Button Triggering Client Side' })).toBeVisible();
  });

  test('Click #7', async ({ page }) => {
    await homepage.sectionClick.click();
    const button = page.getByRole('button', { name: 'Button That Ignores DOM Click' });
    await button.click();
    await page.mouse.move(0, 0); // Clear hover state so the color settles
    await expect(button).toHaveCSS('background-color', 'rgb(40, 167, 69)');
  });

  test('Text Input #8', async ({ page }) => {
    await homepage.sectionTextInput.click();
    await page.getByRole('textbox', { name: 'Set New Button Name' }).fill('Button');
    await page.getByRole('button', { name: 'Button That Should Change it' }).click();
    await expect(page.getByRole('button', { name: 'Button' })).toBeVisible();
  });

  test('Scrollbars #9', async ({ page }) => {
    await homepage.sectionScrollBars.click();
    const hidingButton = page.getByRole('button', { name: 'Hiding Button' });
    await hidingButton.scrollIntoViewIfNeeded();
    await hidingButton.click();
  });

  test('Dynamic Table #10', async ({ page }) => {
    await homepage.sectionDynamicTable.click();

    const chromeRow = page.getByRole('row', { name: /Chrome/ });
    const tableCpu = await chromeRow.getByText(/\d+(\.\d+)?%/).innerText();

    const labelCpu = (await page.getByText(/Chrome CPU:/).innerText())
      .replace('Chrome CPU: ', '')
      .trim();

    expect(tableCpu).toBe(labelCpu);
  });

  test('Verify Text #11', async ({ page }) => {
    await homepage.sectionVerifyText.click();
    const welcome = page.getByText('Welcome UserName!', { exact: true }).last();
    await expect(welcome).toBeVisible();
  });

  test('Progress Bar #12', async ({ page }) => {
    await homepage.sectionProgressBar.click();
    const start = page.getByRole('button', { name: 'Start' });
    const stop = page.getByRole('button', { name: 'Stop' });
    const progress = page.locator('#progressBar');

    await start.click();

    let value = 0;
    while (value < 75) {
      value = Number(await progress.getAttribute('aria-valuenow'));
      await page.waitForTimeout(15);
    }

    await stop.click();

    const finalValue = Number(await progress.getAttribute('aria-valuenow'));
    console.log(`Stopped at: ${finalValue}%`);

    expect(finalValue).toBeGreaterThanOrEqual(70);
    expect(finalValue).toBeLessThanOrEqual(80);
  });

  test('Visibility #13', async ({ page }) => {
    await homepage.sectionVisibility.click();
    await page.getByRole('button', { name: 'Hide' }).click();
    const button = (name: string) => page.getByRole('button', { name, exact: true });

    await expect(button('Removed')).toHaveCount(0);
    await expect(button('Zero Width')).not.toBeVisible();
    await expect(button('Visibility Hidden')).not.toBeVisible();
    await expect(button('Display None')).not.toBeVisible();
    await expect(button('Opacity 0')).toBeVisible();
    await expect(button('Opacity 0')).toHaveCSS('opacity', '0');
    await expect(button('Overlapped')).toBeVisible();
    await expect(button('Offscreen')).toBeVisible();
    await expect(button('Offscreen')).not.toBeInViewport();
  });

  test('Sample App #14', async ({ page }) => {
    await homepage.sectionSampleApp.click();
    await page.getByRole('textbox', { name: 'User Name' }).fill('John Doe');
    await page.getByRole('textbox', { name: '********' }).fill('pwd');
    await page.getByRole('button', { name: 'Log In' }).click();
    await expect(page.getByText('Welcome, John Doe!')).toBeVisible();
  });

  test('Mouse Over #15', async ({ page }) => {
    await homepage.sectionMouseOver.click();

    const link1 = page.getByText('Click me', { exact: true });
    const link2 = page.getByText('Link Button', { exact: true });
    const counts = page.getByText(/The link above clicked \d+ times\./);

    const getCount = async (index: number) => {
      const text = await counts.nth(index).innerText();
      return Number(text.match(/\d+/)![0]);
    };

    const c1Before = await getCount(0);
    const c2Before = await getCount(1);

    await link1.hover();
    await link1.click();
    await link1.hover();
    await link1.click();

    await link2.hover();
    await link2.click();
    await link2.hover();
    await link2.click();

    const c1After = await getCount(0);
    const c2After = await getCount(1);

    expect(c1After).toBe(c1Before + 2);
    expect(c2After).toBe(c2Before + 2);
  });

  test('Non-breaking space #16', async ({ page }) => {
    await homepage.sectionNonBreakingSpace.click();
    const btn = page.locator("//button[text()='My\u00A0Button']");
    await expect(btn).toBeVisible();
  });

  test('Overlapped Element #17', async ({ page }) => {
    await homepage.sectionOverlappedElement.click();

    const form = page.locator('div').nth(3);
    const name = form.locator('input').nth(1);

    await form.evaluate(el => (el.scrollTop = 300));
    await name.fill('Peter Tester');

    await expect(name).toHaveValue('Peter Tester');
  });

  test.only('Shadow DOM #18', async ({ page }) => {
    await homepage.sectionShadowDOM.click();

    const context = page.context();
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    const host = page.locator('guid-generator');
    const generate = host.getByRole('button').nth(0);
    const copy = host.getByRole('button').nth(1);
    const input = host.locator('input');

    await generate.click();
    const guidInput = await input.inputValue();

    await copy.click();
    const guidClipboard = await page.evaluate(() => navigator.clipboard.readText());

    expect(guidClipboard).toBe(guidInput);
  });

  test('Alerts #19', async ({ page }) => {
    await homepage.sectionAlerts.click();
    page.once('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'Alert' }).click();
  });

  test('File Upload #20', async ({ page }) => {
    await homepage.sectionFileUpload.click();

    const filePath = 'objects/file';
    const fileFrame = page.frameLocator('iframe');
    const fileInput = fileFrame.getByText('Browse files');

    await fileInput.setInputFiles(filePath);

    await expect(fileFrame.getByText('Browse files')).toBeVisible();
  });

  test('Animated Button #21', async ({ page }) => {
    await homepage.sectionAnimatedButton.click();

    const start = page.getByRole('button', { name: 'Start Animation' });
    const moving = page.getByRole('button', { name: 'Moving Target' });

    await start.click();

    const movingHandle = await moving.elementHandle();
    await page.waitForFunction(el => !el.className.includes('spin'), movingHandle);

    await moving.click();

    const status = page.locator('#opstatus');
    await expect(status).not.toContainText('spin');
  });

  test('Disabled Input #22', async ({ page }) => {
    await homepage.sectionDisabledInput.click();
    const input = page.getByRole('textbox', { name: 'Edit Field' });
    const button = page.getByRole('button', { name: 'Enable Edit Field with 5' });

    await button.click();
    await expect(input).toBeEnabled();

    await input.fill('12345');
    await expect(input).toHaveValue('12345');
  });

  test('Auto Wait #23', async ({ page }) => {
    await homepage.sectionAutoWait.click();
    const button3s = page.getByRole('button', { name: 'Apply 3s' });
    const checkbox = page.getByRole('checkbox', { name: 'Visible' });

    await checkbox.uncheck();
    await button3s.click();

    await expect(checkbox).toBeChecked();
  });
});
