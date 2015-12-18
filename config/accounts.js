AccountsTemplates.configure({
    defaultLayoutType: 'blaze', // Optional, the default is 'blaze'
    defaultLayout: 'appLayout',
    defaultLayoutRegions: {
        top: 'header',
        bottom: 'footer'
    },
    defaultContentRegion: 'main',
    negativeValidation: false,
    negativeFeedback: false,
    positiveValidation: false,
    positiveFeedback: false,
    homeRoutePath: '/',
    forbidClientAccountCreation: true,
    showForgotPasswordLink: true,
});

AccountsTemplates.configureRoute('signIn');
