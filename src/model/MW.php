<?php
use Slim\Psr7\Response;
use Firebase\JWT\JWT;
class MW{
    public static function VerifyEmailPasswordSet($request, $response, $handler){
        $userInfo = Authenticator::GetRequestJson($request);
        if(isset($userInfo->correo) && isset($userInfo->clave)){
            $response = $handler($request, $response);
        }else{
            $responseJson['mensaje'] = 'Correo y/o clave no seteados.';
            $responseJson['status'] = 403;
            //$response = new Response();
            $response->getBody()->write(json_encode($responseJson));
        }
        return $response;
    }
    public static function VerifyEmailPasswordEmpty($request, $response, $handler){
        //$response = new Response();
        $params = Authenticator::GetRequestJson($request);
        if($params->correo != "" && $params->clave != ""){
            $response = $handler($request, $response);
        }else if($params->correo == "" && $params->clave != ""){
            $responseJson['mensaje'] = 'Correo no definido.';
            $responseJson['status'] = 409;
            $response->getBody()->write(json_encode($responseJson));
        }else if($params->correo != "" && $params->clave == ""){
            $responseJson['mensaje'] = 'Clave no definida.';
            $responseJson['status'] = 409;
            $response->getBody()->write(json_encode($responseJson));
        }else{
            $responseJson['mensaje'] = 'Correo y clave no definidos.';
            $responseJson['status'] = 409;
            $response->getBody()->write(json_encode($responseJson));
        }
        return $response;
    }
    public static function VerifyExistsLogin($request, $response, $handler){
        //$response = new Response();
        $params = Authenticator::GetRequestJson($request);
        $user = DataAccess::GetWhereParam('usuarios', ['name'=>'correo', 'value'=>$params->correo, 'type'=>PDO::PARAM_STR]);
        if($user == null || $user == false){
            $responseJson['mensaje'] = 'Usuario inexistente.';
            $responseJson['status'] = 403;
            $response->getBody()->write(json_encode($responseJson));
        }else{
            if($user->clave == $params->clave){
                $response = $handler($request, $response);
            }else{
                $responseJson['mensaje'] = 'Clave incorrecta.';
                $responseJson['status'] = 403;
                $response->getBody()->write(json_encode($responseJson));
            }
        }
        return $response;
    }
    public static function VerifyToken($request, $response, $handler){
        $token = Authenticator::GetToken($request);
        $sec = @json_decode(file_get_contents(__DIR__. '/privatekey.json'));
        if($sec != null && $token != null){
            try{
                JWT::decode($token, $sec->key, [$sec->alg]);
                $response = $handler($request, $response);
            }catch(Exception $e){
                $responseJson['mensaje'] = 'Token invalido.';
                $responseJson['status'] = 403;
                $response->getBody()->write(json_encode($responseJson));
            }
        }else{
            $responseJson['mensaje'] = 'Error interno.';
            $responseJson['status'] = 403;
            $response->getBody()->write(json_encode($responseJson));
        }        
        return $response;
    }
}