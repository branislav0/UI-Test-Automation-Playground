import { Page, Locator } from '@playwright/test';

export class Homepage {
    readonly page: Page;
    readonly sectionDynamicID: Locator;
    readonly sectionClassAttribute: Locator;
    readonly sectionHiddenLayers: Locator;
    readonly sectionLoadDelay: Locator;
    readonly sectionAjaxData: Locator;
    readonly sectionClientSideDelay: Locator;
    readonly sectionClick: Locator;
    readonly sectionTextInput: Locator;
    readonly sectionScrollBars: Locator;
    readonly sectionDynamicTable: Locator;
    readonly sectionVerifyText: Locator;
    readonly sectionProgressBar: Locator;
    readonly sectionVisibility: Locator;
    readonly sectionSampleApp: Locator;
    readonly sectionMouseOver: Locator;
    readonly sectionNonBreakingSpace: Locator;
    readonly sectionOverlappedElement: Locator;
    readonly sectionShadowDOM: Locator;
    readonly sectionAlerts: Locator;
    readonly sectionFileUpload: Locator;
    readonly sectionAnimatedButton: Locator;
    readonly sectionDisabledInput: Locator;
    readonly sectionAutoWait: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sectionDynamicID = page.getByRole('link', { name: 'Dynamic ID' });
        this.sectionClassAttribute = page.getByRole('link', { name: 'Class Attribute' });
        this.sectionHiddenLayers = page.getByRole('link', { name: 'Hidden Layers' });
        this.sectionLoadDelay = page.getByRole('link', { name: 'Load Delay' });
        this.sectionAjaxData = page.getByRole('link', { name: 'AJAX Data' });
        this.sectionClientSideDelay = page.getByRole('link', { name: 'Client Side Delay' });
        this.sectionClick = page.getByRole('link', { name: 'Click' });
        this.sectionTextInput = page.getByRole('link', { name: 'Text Input' });
        this.sectionScrollBars = page.getByRole('link', { name: 'Scrollbars' });
        this.sectionDynamicTable = page.getByRole('link', { name: 'Dynamic Table' });
        this.sectionVerifyText = page.getByRole('link', { name: 'Verify Text' });
        this.sectionProgressBar = page.getByRole('link', { name: 'Progress Bar' });
        this.sectionVisibility = page.getByRole('link', { name: 'Visibility' });
        this.sectionSampleApp = page.getByRole('link', { name: 'Sample App' });
        this.sectionMouseOver = page.getByRole('link', { name: 'Mouse Over' });
        this.sectionNonBreakingSpace = page.getByRole('link', { name: 'Non-Breaking Space' });
        this.sectionOverlappedElement = page.getByRole('link', { name: 'Overlapped Element' });
        this.sectionShadowDOM = page.getByRole('link', { name: 'Shadow DOM' });
        this.sectionAlerts = page.getByRole('link', { name: 'Alerts' });
        this.sectionFileUpload = page.getByRole('link', { name: 'File Upload' });
        this.sectionAnimatedButton = page.getByRole('link', { name: 'Animated Button' });
        this.sectionDisabledInput = page.getByRole('link', { name: 'Disabled Input' });
        this.sectionAutoWait = page.getByRole('link', { name: 'Auto Wait' });
    }
}