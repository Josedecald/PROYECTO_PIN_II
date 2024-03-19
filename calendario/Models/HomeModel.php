<?php
class HomeModel extends Query{
    public function __construct()
    {
        parent::__construct();
    }
    public function registrar($title,$user, $inicio, $color)
    {
        $sql = "INSERT INTO evento (title, user, start, color) VALUES (?,?,?,?)";
        $array = array($title,$user, $inicio, $color);
        $data = $this->save($sql, $array);
        if ($data == 1) {
            $res = 'ok';
        }else{
            $res = 'error';
        }
        return $res;
    }
    public function getEventos()
    {
        $sql = "SELECT * FROM evento";
        return $this->selectAll($sql);
    }
    public function modificar($title,$user, $inicio, $color, $id)
    {
        $sql = "UPDATE evento SET title=?, user=?, start=?, color=? WHERE id=?";
        $array = array($title, $user, $inicio, $color, $id);
        $data = $this->save($sql, $array);
        if ($data == 1) {
            $res = 'ok';
        } else {
            $res = 'error';
        }
        return $res;
    }
    public function eliminar($id)
    {
        $sql = "DELETE FROM evento WHERE id=?";
        $array = array($id);
        $data = $this->save($sql, $array);
        if ($data == 1) {
            $res = 'ok';
        } else {
            $res = 'error';
        }
        return $res;
    }
    public function dragOver($start,$user, $id)
    {
        $sql = "UPDATE evento SET start=? WHERE id=?";
        $array = array($start, $id);
        $data = $this->save($sql, $array);
        if ($data == 1) {
            $res = 'ok';
        } else {
            $res = 'error';
        }
        return $res;
    }
}

?>