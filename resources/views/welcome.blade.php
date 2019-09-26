<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel</title>

        <meta name="csrf-token" content="{{ csrf_token() }}">
      
        <!-- Styles -->
        <link rel="stylesheet" type="text/css" href="{{ mix('/css/app.css') }}" />
    </head>
    <body>
        <div id="app">
            <vue-snotify></vue-snotify>

            <preloader-component></preloader-component>                
            <router-view></router-view>                
        </div>

        <script src="{{ mix('/js/app.js') }}"></script>
    </body>
</html>
