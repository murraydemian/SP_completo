/// <reference path="../../depend/node_modules/@types/jquery/index.d.ts"/>
var SegundoParcial;
(function (SegundoParcial) {
    var Controller = /** @class */ (function () {
        function Controller() {
        }
        Controller.InitialLoad = function () {
            this.VerifySession();
        };
        Controller.VerifySession = function () {
            var token = Controller.GetToken();
            $.ajax({
                method: 'GET',
                async: true,
                url: Controller.BASEPATH + '/login',
                headers: { "token": token }
            }).done(function (data) {
                data = JSON.parse(data);
                if (data.status === 200) {
                    SegundoParcial.PageLoader.Principal();
                }
                else {
                    SegundoParcial.PageLoader.Login();
                }
            }).fail(function () {
                SegundoParcial.PageLoader.Login();
                $('#alert_container').html(SegundoParcial.Alerts.Danger('Error.', 'No se pudo verificar sesion.'));
            });
        };
        Controller.VerifySession_noReload = function () {
            var token = Controller.GetToken();
            $.ajax({
                method: 'GET',
                async: true,
                url: Controller.BASEPATH + '/login',
                headers: { "token": token }
            }).done(function (data) {
                data = JSON.parse(data);
                if (data.status === 200) {
                }
                else {
                    SegundoParcial.PageLoader.Login();
                }
            }).fail(function () {
                SegundoParcial.PageLoader.Login();
                $('#alert_container').html(SegundoParcial.Alerts.Danger('Error.', 'No se pudo verificar sesion.'));
            });
        };
        Controller.LoginComplete = function (token) {
            Controller.SaveToken(token);
            SegundoParcial.PageLoader.Principal();
            $('#alert_container').html(SegundoParcial.Alerts.Success('Bienvenido.', ''));
        };
        Controller.Registro = function () {
            SegundoParcial.PageLoader.Registro();
        };
        Controller.GetToken = function () {
            return window.localStorage.getItem('token');
        };
        Controller.SaveToken = function (token) {
            window.localStorage.setItem('token', token);
        };
        Controller.CerrarSesion = function () {
            window.localStorage.setItem('token', '');
            Controller.VerifySession();
        };
        Controller.BASEPATH = './src/Controller/api.php';
        return Controller;
    }());
    SegundoParcial.Controller = Controller;
})(SegundoParcial || (SegundoParcial = {}));
var SegundoParcial;
(function (SegundoParcial) {
    var LoginPage = /** @class */ (function () {
        function LoginPage() {
        }
        LoginPage.Login = function () {
            var userObj = { correo: $('#login_correo_text').val(),
                clave: $('#login_clave_text').val() };
            var frmData = new FormData();
            frmData.set('user', (JSON.stringify(userObj)));
            $.ajax({
                method: 'POST',
                async: true,
                url: SegundoParcial.Controller.BASEPATH + '/login',
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                data: frmData
            }).done(function (data) {
                if (data.exito) {
                    //redirecciona
                    SegundoParcial.Controller.LoginComplete(data.jwt);
                }
                else {
                    var alert_1 = SegundoParcial.Alerts.Danger('Error.', data.mensaje);
                    $('#alert_container').html(alert_1);
                }
            }).fail(function (data) {
                $('#alert_container').html(SegundoParcial.Alerts.Danger('Error.', 'Hubo un error en la conexion'));
            });
        };
        LoginPage.Limpiar = function () {
            $('#login_clave_text').val('');
            $('#login_correo_text').val('');
        };
        LoginPage.BASEPATH = './src/Controller/api.php';
        return LoginPage;
    }());
    SegundoParcial.LoginPage = LoginPage;
})(SegundoParcial || (SegundoParcial = {}));
/// <reference path="../../depend/node_modules/@types/jquery/index.d.ts"/>
var SegundoParcial;
(function (SegundoParcial) {
    var Principal = /** @class */ (function () {
        function Principal() {
        }
        Principal.ListarBarbijos = function () {
            var token = SegundoParcial.Controller.GetToken();
            $.ajax({
                method: 'GET',
                async: true,
                url: SegundoParcial.Controller.BASEPATH + '/barbijos',
                cache: false,
                contentType: false,
                processData: false,
                headers: { 'token': token }
            }).done(function (data) {
                data = JSON.parse(data);
                if (data.exito) {
                    SegundoParcial.Tables.Barbijos(data.tabla, 'izquierda');
                }
                else {
                    if (data.status == 403) {
                        SegundoParcial.PageLoader.Login();
                    }
                    else {
                        var alert_2 = SegundoParcial.Alerts.Danger('Ups.', 'Nos encontramos con el siguiente problema: ' + data.mensaje);
                        $('#alert_container').html(alert_2);
                    }
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                $('#spinner_izquierda').attr('style', 'display: none;');
                var alert = SegundoParcial.Alerts.Danger(jqXHR.status, jqXHR.statusText);
                $('#alert_container').html(alert);
            });
        };
        Principal.ListarUsuarios = function () {
            SegundoParcial.Controller.VerifySession_noReload();
            var token = SegundoParcial.Controller.GetToken();
            $.ajax({
                method: 'GET',
                async: true,
                url: SegundoParcial.Controller.BASEPATH + '/',
                cache: false,
                contentType: false,
                processData: false,
                headers: { 'token': token }
            }).done(function (data) {
                data = JSON.parse(data);
                if (data.exito == true) {
                    SegundoParcial.Tables.Usuarios(data.tabla);
                }
                else {
                    var alert_3 = SegundoParcial.Alerts.Warning('Ups.', 'Nos encontramos con el siguiente problema: ' + data.mensaje);
                    $('#alert_container').html(alert_3);
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                var alert = SegundoParcial.Alerts.Danger(jqXHR.status, jqXHR.statusText);
                $('#alert_container').html(alert);
            });
        };
        Principal.BorrarItem = function (item) {
            SegundoParcial.Controller.VerifySession_noReload();
            var obj = JSON.parse(item.split("'").join('"'));
            if (window.confirm('Esta seguro que desea borrar el articulo:\n\tID:' + obj.id + '\n\tColor:' + obj.color + '\n\tTipo:' + obj.tipo + '\n\tPrecio:' + obj.precio)) {
                var token = SegundoParcial.Controller.GetToken();
                $.ajax({
                    method: 'DELETE',
                    async: true,
                    url: SegundoParcial.Controller.BASEPATH + '/',
                    headers: { 'token': token },
                    data: { 'barbijo': JSON.stringify({ "id": obj.id }) }
                }).done(function (data) {
                    data = JSON.parse(data);
                    if (data.exito == true) {
                        Principal.ListarBarbijos();
                    }
                    else {
                        if (data.status == 403) {
                            SegundoParcial.PageLoader.Login();
                        }
                        var alert_4 = SegundoParcial.Alerts.Warning('Ups.', 'Nos encontramos con el siguiente problema: ' + data.mensaje);
                        $('#alert_container').html(alert_4);
                    }
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    var alert = SegundoParcial.Alerts.Danger(jqXHR.status, jqXHR.statusText);
                    $('#alert_container').html(alert);
                });
            }
        };
        Principal.ModificarItem = function (item) {
            SegundoParcial.Controller.VerifySession_noReload();
            var token = SegundoParcial.Controller.GetToken();
            var payload = Principal.PreparePayload(true);
            $.ajax({
                url: SegundoParcial.Controller.BASEPATH + '/',
                method: 'PUT',
                type: 'PUT',
                dataType: 'json',
                async: true,
                headers: { 'token': token },
                data: { "barbijo": payload }
            }).done(function (data) {
                if (data.exito) {
                    Principal.ListarBarbijos();
                }
                else {
                    var alert_5 = SegundoParcial.Alerts.Warning('Error.', data.mensaje);
                    $('#alert_container').html(alert_5);
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                var alert = SegundoParcial.Alerts.Danger(jqXHR.status, jqXHR.statusText);
                $('#alert_container').html(alert);
            });
        };
        Principal.AgregarItem = function () {
            SegundoParcial.Controller.VerifySession_noReload();
            var token = SegundoParcial.Controller.GetToken();
            var payload = Principal.PreparePayload(false);
            console.log(payload);
            $.ajax({
                url: SegundoParcial.Controller.BASEPATH + '/',
                method: 'POST',
                type: 'POST',
                dataType: 'json',
                async: true,
                headers: { 'token': token },
                data: { "barbijo": payload }
            }).done(function (data) {
                if (data.exito) {
                    var alert_6 = SegundoParcial.Alerts.Success('', data.mensaje);
                    $('#alert_container').html(alert_6);
                    Principal.ListarBarbijos();
                    Principal.LimpiarForm();
                }
                else {
                    var alert_7 = SegundoParcial.Alerts.Warning('Error.', data.mensaje);
                    $('#alert_container').html(alert_7);
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                var alert = SegundoParcial.Alerts.Danger(jqXHR.status, jqXHR.statusText);
                $('#alert_container').html(alert);
            });
        };
        Principal.LimpiarForm = function () {
            $('#input_tipo').val('');
            $('#input_color').val('');
            $('#input_precio').val('');
        };
        Principal.PreparePayload = function (mod) {
            var _id = mod ? $('#input_id').val() : null;
            var _color = $('#input_color').val();
            var _tipo = $('#input_tipo').val();
            var _precio = $('#input_precio').val();
            var payload = {};
            if (mod) {
                payload = {
                    id: _id,
                    color: _color,
                    tipo: _tipo,
                    precio: _precio
                };
            }
            else {
                payload = {
                    color: _color,
                    tipo: _tipo,
                    precio: _precio
                };
            }
            return JSON.stringify(payload);
        };
        Principal.CancelarModificar = function () {
            $('#form_item').attr('style', 'display:none;');
            $('#titulo_derecha').attr('style', 'display:block;');
        };
        return Principal;
    }());
    SegundoParcial.Principal = Principal;
})(SegundoParcial || (SegundoParcial = {}));
var SegundoParcial;
(function (SegundoParcial) {
    var Registro = /** @class */ (function () {
        function Registro() {
        }
        Registro.Registrar = function () {
            if (Registro.IsComplete()) {
                var payload = Registro.PreparePayload();
                $.ajax({
                    method: 'POST',
                    async: true,
                    url: SegundoParcial.Controller.BASEPATH + '/usuarios',
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: payload
                }).done(function (data) {
                    if (data.status == 200) {
                        SegundoParcial.PageLoader.Login();
                    }
                    else {
                        var alert_8 = SegundoParcial.Alerts.Warning('Ups.', 'Nos encontramos con el siguiente problema: ' + data.mensaje);
                        $('#alert_container').html(alert_8);
                    }
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    var alert = SegundoParcial.Alerts.Danger(jqXHR.status, jqXHR.statusText);
                    $('#alert_container').html(alert);
                });
            }
            else {
                $('#alert_container').html(SegundoParcial.Alerts.Warning('', 'Campos incompletos'));
            }
        };
        Registro.Limpiar = function () {
            $('#registro_clave_text').val('');
            $('#registro_correo_text').val('');
            $('#registro_nombre_text').val('');
            $('#registro_apellido_text').val('');
            $('#registro_perfil_select').val('Seleccionar perfil');
            $('#registro_foto_file').val('');
        };
        Registro.IsComplete = function () {
            if ($('#registro_clave_text').val() == '') {
                return false;
            }
            if ($('#registro_correo_text').val() == '') {
                return false;
            }
            if ($('#registro_nombre_text').val() == '') {
                return false;
            }
            if ($('#registro_apellido_text').val() == '') {
                return false;
            }
            if ($('#registro_perfil_select').val() == 'Seleccionar perfil') {
                return false;
            }
            if ($('#registro_foto_file').val() == '') {
                return false;
            }
            return true;
        };
        Registro.PreparePayload = function () {
            var foto = $('#registro_foto_file').prop('files')[0];
            var userData = {
                correo: $('#registro_correo_text').val(),
                clave: $('#registro_clave_text').val(),
                nombre: $('#registro_nombre_text').val(),
                apellido: $('#registro_apellido_text').val(),
                perfil: $('#registro_perfil_select').val()
            };
            var payload = new FormData();
            payload.append('usuario', JSON.stringify(userData));
            payload.append('foto', foto);
            return payload;
        };
        return Registro;
    }());
    SegundoParcial.Registro = Registro;
})(SegundoParcial || (SegundoParcial = {}));
var SegundoParcial;
(function (SegundoParcial) {
    var Alerts = /** @class */ (function () {
        function Alerts() {
        }
        Alerts.Danger = function (strong, normal, cols) {
            if (cols === void 0) { cols = 4; }
            return '<div class="alert alert-danger alert-dismissible fade show col-' + cols + '" role="alert">' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '<strong>' + strong + '</strong> ' + normal +
                '</div>';
        };
        Alerts.Warning = function (strong, normal, cols) {
            if (cols === void 0) { cols = 4; }
            return '<div class="alert alert-warning alert-dismissible fade show col-' + cols + '" role="alert">' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '<strong>' + strong + '</strong> ' + normal +
                '</div>';
        };
        Alerts.Success = function (strong, normal, cols) {
            if (cols === void 0) { cols = 4; }
            return '<div class="alert alert-success alert-dismissible fade show col-' + cols + '" role="alert">' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '<strong>' + strong + '</strong> ' + normal +
                '</div>';
        };
        Alerts.Info = function (strong, normal, cols) {
            if (cols === void 0) { cols = 4; }
            return '<div class="alert alert-info alert-dismissible fade show col-' + cols + '" role="alert">' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '<strong>' + strong + '</strong> ' + normal +
                '</div>';
        };
        return Alerts;
    }());
    SegundoParcial.Alerts = Alerts;
})(SegundoParcial || (SegundoParcial = {}));
var SegundoParcial;
(function (SegundoParcial) {
    var PageLoader = /** @class */ (function () {
        function PageLoader() {
        }
        PageLoader.Login = function () {
            $('#page_body').load('./public/View/pages/login.html');
            $('#page_body').attr('style', 'background-color:lightpink');
        };
        PageLoader.Registro = function () {
            $('#page_body').load('./public/View/pages/registro.html');
            $('#page_body').attr('style', 'background-color: rgb(153, 167, 184);');
        };
        PageLoader.Principal = function () {
            $('#page_body').load('./public/View/pages/principal.html');
            $('#page_body').attr('style', 'background-color: rgb(153, 167, 184);');
        };
        return PageLoader;
    }());
    SegundoParcial.PageLoader = PageLoader;
})(SegundoParcial || (SegundoParcial = {}));
var SegundoParcial;
(function (SegundoParcial) {
    var Tables = /** @class */ (function () {
        function Tables() {
        }
        Tables.Barbijos = function (lista, lado) {
            if (lado === void 0) { lado = 'izquierda'; }
            $('#titulo_' + lado).attr('style', 'display: none;');
            $('#tabla_' + lado).attr('style', 'display: block; padding-top:7mm;');
            var tablehead = '<th>COLOR</th> <th>TIPO</th> <th>PRECIO</th> <th></th> <th></th>';
            var usertable = '';
            lista.forEach(function (element) {
                usertable += '<tr><td>' + element.color + '</td>' +
                    '<td>' + element.tipo + '</td>' +
                    '<td>' + element.precio + '</td>' +
                    '<td>' + Tables.BtnBorrar(element) + '</td>' +
                    '<td>' + Tables.BtnModificar(element) + '</td>';
            });
            $('#table_head_' + lado).html(tablehead);
            $('#table_body_' + lado).html(usertable);
        };
        Tables.Usuarios = function (lista, lado) {
            if (lado === void 0) { lado = 'derecha'; }
            $('#form_item').attr('style', 'display: none;');
            $('#titulo_' + lado).attr('style', 'display: none');
            $('#tabla_' + lado).attr('style', 'display: block; padding-top:7mm;');
            var tablehead = '<th>CORREO</th> <th>NOMBRE</th> <th>APELLIDO</th> <th>PERFIL</th> <th>FOTO</th>';
            var usertable = '';
            lista.forEach(function (element) {
                if (element.foto == null) {
                    element.foto = './fotos/default-user-image.png';
                }
                usertable += /*'<tr> <td>'+ element.id +' </td>'+*/
                    '<tr><td>' + element.correo + '</td>' +
                        '<td>' + element.nombre + '</td>' +
                        '<td>' + element.apellido + '</td>' +
                        '<td>' + element.perfil + '</td>' +
                        '<td><img src="./src' + element.foto.substr(1) + '" height="50px" width="50px" /></td> </tr>';
            });
            $('#table_head_' + lado).html(tablehead);
            $('#table_body_' + lado).html(usertable);
        };
        Tables.BtnBorrar = function (item) {
            var jsonstring = JSON.stringify(item);
            jsonstring = jsonstring.split('"').join("'");
            return '<button class="btn btn-danger border-light" onclick="SegundoParcial.Principal.BorrarItem(`' + jsonstring + '`)">Borrar</button>';
        };
        Tables.BtnModificar = function (item) {
            var jsonstring = JSON.stringify(item);
            jsonstring = jsonstring.split('"').join("'");
            return '<button class="btn btn-info border-light" onclick="SegundoParcial.Tables.FormModificar(`' + jsonstring + '`)">Modificar</button>';
        };
        Tables.FormModificar = function (item, lado) {
            if (lado === void 0) { lado = 'derecha'; }
            var obj = JSON.parse(item.split("'").join('"'));
            $('#titulo_' + lado).attr('style', 'display: none');
            $('#tabla_' + lado).attr('style', 'display: none; padding-top:7mm;');
            $('#inline_color').attr('class', 'form-inline align-content-center col-12 py-2');
            $('#form_item').attr('style', 'display: block;');
            $('#inline_id').attr('style', 'display: block;');
            $('#input_id').attr('value', obj.id);
            $('#input_tipo').attr('value', obj.tipo);
            $('#input_color').attr('value', obj.color);
            $('#input_precio').attr('value', obj.precio);
            $('#btn_succ_form').html('Modificar');
            $('#btn_succ_form').attr('onclick', 'SegundoParcial.Principal.ModificarItem()');
            $('#btn_warn_form').html('Cancelar');
            $('#btn_warn_form').attr('onclick', 'SegundoParcial.Principal.CancelarModificar()');
        };
        Tables.FormAgregar = function (lado) {
            if (lado === void 0) { lado = 'derecha'; }
            $('#titulo_' + lado).attr('style', 'display: none');
            $('#tabla_' + lado).attr('style', 'display: none; padding-top:7mm;');
            $('#inline_color').attr('class', 'form-inline align-content-center col-12 py-2 pt-4');
            $('#form_item').attr('style', 'display: block;');
            $('#inline_id').attr('style', 'display: none;');
            $('#input_id').attr('value', null);
            $('#input_tipo').attr('value', null);
            $('#input_color').attr('value', null);
            $('#input_precio').attr('value', null);
            $('#btn_succ_form').html('Agregar');
            $('#btn_succ_form').attr('onclick', 'SegundoParcial.Principal.AgregarItem()');
            $('#btn_warn_form').html('Limpiar');
            $('#btn_warn_form').attr('onclick', 'SegundoParcial.Principal.LimpiarForm()');
        };
        Tables.UsuariosFiltrados = function (lista, lado) {
            if (lado === void 0) { lado = 'derecha'; }
            console.log(lista);
            $('#titulo_' + lado).attr('style', 'display: none');
            $('#tabla_' + lado).attr('style', 'display: block; padding-top:7mm;');
            var tablehead = '<th>NOMBRE</th> <th>FOTO</th>';
            var usertable = '';
            lista.forEach(function (element) {
                if (element.foto == null) {
                    element.foto = './fotos/default-user-image.png';
                }
                usertable += /*'<tr> <td>'+ element.id +' </td>'+*/
                    '<tr><td>' + element.nombre + '</td>' +
                        '<td><img src="./src' + element.foto.substr(1) + '" height="50px" width="50px" /></td> </tr>';
            });
            $('#table_head_' + lado).html(tablehead);
            $('#table_body_' + lado).html(usertable);
        };
        return Tables;
    }());
    SegundoParcial.Tables = Tables;
})(SegundoParcial || (SegundoParcial = {}));
