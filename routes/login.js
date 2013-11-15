
/*
 * GET login page.
 */

exports.login = function(req, res) {
  res.render('login', { name: 'the login page', temp: 'test' });
};

/*
 * POST login page.
 */

exports.loginPost = function(req, res) {
  authenticate(req.body.username, req.body.password, function(err, user){
    if (user) {
      // Regenerate session when signing in
      // to prevent fixation 
      req.session.regenerate(function(){
        // Store the user's primary key 
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
        req.session.success = 'Authenticated as ' + user.name
          + ' click to <a href="/logout">logout</a>. '
          + ' You may now access <a href="/admin">/restricted</a>.';
        res.redirect('admin');
      });
    } else {
      req.session.error = 'Authentication failed, please check your '
        + ' username and password.'
        + ' (use "admin" and "admin")';
      res.redirect('login');
    }
  });
};