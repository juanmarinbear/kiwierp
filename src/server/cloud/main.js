Parse.Cloud.define('deleteUser', function(request, response) {
  Parse.Cloud.useMasterKey();
  var query = new Parse.Query(Parse.User);
  query.get(request.params.objectId, {
    success: function(user) {
      user.destroy({
        success: function() {
          response.success('User deleted');
        },
        error: function(error) {
          response.error(error);
        }
      });
    }, 
    error: function(error) {
      response.error(error);
    }
  });
});

Parse.Cloud.define('editUser', function(request, response) {
  Parse.Cloud.useMasterKey();
  var query = new Parse.Query(Parse.User);
  query.get(request.params.objectId, {
    success: function(user) {
      user.save(request.params, {
        success: function(user) {
          response.success('User updated') ;
        },
        error: function(error) {
          response.error(error) ;
        }
      });
    }, 
    error: function(error) {
      response.error(error);
    }
  });
});

Parse.Cloud.define('resetPassword', function(request, response) {
  Parse.Cloud.useMasterKey();
  Parse.User.requestPasswordReset(request.params.email, {
    success: function(user) {
      response.success('Password reset successful');
    }, 
    error: function(error) {
      response.error(error);
    }
  });
});

Parse.Cloud.afterSave(Parse.User, function(request) {
  Parse.Cloud.useMasterKey();
  Parse.User.requestPasswordReset(request.object.get('email'), {
    success: function(user) {
      console.log('Password reset successful');
    }, 
    error: function(error) {
      console.error(error);
    }
  });
});
