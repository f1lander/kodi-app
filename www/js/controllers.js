app.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state, $http, $ionicHistory) {
    // Create the login modal that we will use later
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $scope.loginData = {};
    $scope.token = localStorage.getItem('token');
    $scope.progress = localStorage.getItem('progress');

    if($scope.token && $scope.progress){
      $state.go('app.dashboard');
    }

    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      $http.post("http://kusuk.in/api/v1/users/sign_in", {
        user: {
          email: $scope.loginData.username,
          password: $scope.loginData.password
        }
      }).then(function (data) {
        if(data) {
          console.log(data);
          alert('Bienvenido: ' + data.data.user.email);
          localStorage.setItem('token', JSON.stringify({ "user_token": data.data.authentication_token, "user_email": data.data.user.email }));
          $.get("http://kusuk.in/api/v1/progress/get",
            {
              "course_id": 13,
              "user_email": data["data"]["user"]["email"],
              "user_token": data["data"]["authentication_token"]
            }).done(function (data2) {
              var _level = JSON.parse(data2.json_data)
              localStorage.setItem('progress',JSON.stringify({mission:0,level:_level.current_level}));
              $state.go('app.dashboard');
            }).fail(function (err) {
              alert("no hay curso");
              window.location.replace("game.html?user_email=" + data["user"]["email"] + "&user_token=" + data["authentication_token"] + "&current_level=" + "0");
            });
       
        }
      }, function (error) {
        console.log(error);
        alert('Usuario o contrasenia invalidos');
      });

    };
  })
  
  .controller('RegisterController', function ($scope, $state, $http, $ionicHistory) {
     $scope.loginData = {};
     $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $scope.register =  function() {
      if($scope.loginData.password == $scope.loginData.password2){
       $.post("http://kusuk.in/api/v1/users",
          {user: { email: $scope.loginData.username, password: $scope.loginData.password} })
          .done(function(data)
          {
            if(data["state"]["messages"])
            {
              alert(data["state"]["messages"][0]);
            }else
            {
              localStorage.setItem('progress',JSON.stringify({mission:0,level:0}));
              $state.go('app.dashboard');
            }
          }).fail(function(data)
          {
            alert("Sign error");
          })
      }else{
        alert('Las contraseñas deben de coincidir');
      }
    };
  })
  
  .controller('DashboardController', function ($scope, $ionicModal, $timeout, $http, $rootScope, $ocLazyLoad, $state, $ionicHistory) {
    var progress = JSON.parse(localStorage.getItem('progress'));
    var _token = JSON.parse(localStorage.getItem('token'));
    $scope.achievements = [];
    if(_token){
    $.get("http://kusuk.in/api/v1/achievements/",
      {
        "course_id": 13,
        "user_email": _token.user_email,
        "user_token": _token.user_token
      }).done(function (data) {
        console.log(data);
        data.achievements.forEach(function(value) {
        this.push({
            name: value.name,
            mission: "0",
            image: "http://kusuk.in/" + value.icon,
            description: value.description
          })
        }, $scope.achievements);
        

        $scope.$apply();
      }).fail(function (err) {
        console.log(err);
      });
    }
    $scope.level_packs = [
      {
        name: "El Salón de Entrenamiento",
        mission: "0",
        image: "assets/dashboard/cover_pack01.png",
        levels: "Niveles",
        levels2: "1 - 10",
        back: "Confirma todos los sistemas a 100% funcionalidad, aprende a operar a Ro-bot en 10 misiones. 3 logros por desbloquear."
      },
      {
        name: "Misión: Reparación A",
        mission: "1",
        image: "assets/dashboard/cover_pack02.png",
        levels: "Niveles",
        levels2: "11 - 20",
        back: "Opera desde la tierra a Ro-bot a llegar a sus objetivos en la caminata por las placas de celdas solares."
      },
      {
        name: "Misión: Reparación B",
        mission: "2",
        image: "assets/dashboard/cover_pack03.png",
        levels: "Niveles",
        levels2: "21 - 30",
        back: "Continúa la caminata espacial y Ro-Bot necesita de tu ayuda para alcanzar sus objetivos. La velocidad en ejecución es de esencia en esta misión."
      }];

    $scope.goGame = function (level_pack, _level) {
      console.log("Going to the game");
      var level = _level < 0 ? progress.level : _level;
      
      $state.go('app.game',{progress:JSON.stringify({mission:level_pack.mission,level:level})})
    
    };

  })

