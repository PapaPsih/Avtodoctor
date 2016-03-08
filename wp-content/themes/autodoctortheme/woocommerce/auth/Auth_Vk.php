<?php

class Auth_Vk {

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


         $ku = curl_init();

        $query = "?client_id=".APP_ID."&client_secret=".APP_SECRET."&redirect_uri=".REDIRECT_URL."&code=".$this->code;

        curl_setopt($ku, CURLOPT_URL, URL_ACCESS_TOKEN.$query);
        curl_setopt($ku, CURLOPT_RETURNTRANSFER, TRUE);
        $result = curl_exec($ku);
        curl_close($ku);

        $pars_res = json_decode($result);

        if ($pars_res->access_token)
        {
            $this->set_token($pars_res->access_token);
            $this->set_uid($pars_res->user_id);
            $this->set_email($pars_res->email);
            $_SESSION['user_token'] = $this->code;
            return TRUE;
        }
        else if ($result->error)
            return FALSE;
    }

    public function get_user ()
    {
        $kur = curl_init();

        $query = 'users.get?user_ids='.$this->uid.'&fields=first_name&name_case=nom&v=5.45&access_token='.$this->token;

        curl_setopt($kur, CURLOPT_URL, URL_METHOD.$query);

        curl_setopt($kur, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($kur, CURLOPT_SSL_VERIFYHOST, false);

        curl_setopt($kur, CURLOPT_RETURNTRANSFER, TRUE);
        $result = curl_exec($kur);
        curl_close($kur);
        if (isset ($result))
        {
         $_SESSION['user'] = json_decode($result);
         $_SESSION['user_email'] = $this->email;
        }

        $this->redirect_url('http://avtodoctor.com.ua/');
    }
}
    ?>
