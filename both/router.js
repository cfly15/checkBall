FlowRouter.route('/', {
    action: function(params, queryParams) {
      BlazeLayout.render('appLayout', {top:'header', bottom:'footer', main: 'main'});
    }
});

FlowRouter.route('/settings', {
    action: function(params, queryParams) {
      BlazeLayout.render('appLayout', {top:'header', bottom:'footer', main: 'settings'});
    }
});

FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);
