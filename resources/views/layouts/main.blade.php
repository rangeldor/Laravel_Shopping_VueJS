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
        <link rel="shortcut icon" href="{{ url('imgs/fivicon-vue.png') }}" type="image/png">
    </head>
    <body>
        <div id="app">
            @yield('content')              
        </div>

        <script src="{{ mix('/js/app.js') }}"></script>
    </body>
</html>
