<?php

class response
{
    public $first_name;
    public $last_name;
}

class user_data
{
    public $response;

    public  function __construct ()
    {
        $response = array();
        $response[] = new response();
    }

}
    class Auth_Fb
    {
        private $code;
        private $token;
        private $uid;
        private $email;

        public function __construct ()
        {
            require "configuration.php";
        }

        public function set_code ($code)
        {
            $this->code = $code;
        }

        public function set_token ($token)
        {
            $this->token = $token;
        }

        public function set_uid ($uid)
        {
            $this->uid = $uid;
        }

        public function set_email ($email)
        {
            $this->email=$email;
        }

        public function redirect_url ($url)
        {
            header("HTTP/1.1 301 Moved Permanently");
            header("Location: ".$url);
            exit ();
        }

        public function get_token ()
        {
            if (!$this->code)
                exit();

            $params = array(
                'client_id'     => ClIENT_ID,
                'redirect_uri'  => REDIRECT_URL_FB,
                'client_secret' => ClIENT_SECRET,
                'code'          => $this->code
            );

            $tokenInfo = null;
            parse_str(file_get_contents(URL_ACCESS_TOKEN_FB . '?' . http_build_query($params)), $tokenInfo);

            if (isset($tokenInfo['access_token'])) {

                $params = array('access_token' => $tokenInfo['access_token']);

                $this->set_token($params);
            }
            $_SESSION['user_token'] = $this->code;

        }

        public function get_user ()
        {
            $result = json_decode(file_get_contents('https://graph.facebook.com/me' . '?fields=email,first_name,last_name&' . urldecode(http_build_query($this->token))), true);

            if (isset ($result))
            {
            $user_data = new user_data();
            $user_data->response[0]->first_name = $result['first_name'];
            $user_data->response[0]->last_name = $result['last_name'];

            $_SESSION['user'] = $user_data;
            $_SESSION['user_email'] = $result['email'];
            }

            $this->redirect_url('http://avtodoctor.com.ua/');

        }


        public function get_link_share()
        {
            $query = 'app_id='.ClIENT_ID.'&redirect_uri='.$_SERVER['HTTP_REFERER'].'&display=page&href='.get_permalink();
            return 'https://www.facebook.com/dialog/share?'.$query;

        }

    }

?>

