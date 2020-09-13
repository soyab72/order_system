<?php

namespace App\Repositories\Contract;

interface OrderInterface
{
    /**
     * @return string
     */
    public function model();

    /**
     * @return Model
     */
    public function makeModel();

    /**
     * @param array $data
     * @return mixed
     */
    public function save(array $data);

    /**
     * @param array $data
     * @param        $id
     * @param string $attribute
     * @return mixed
     */
    public function update(array $data, $id, $attribute = "id");

    /**
     * @param  $matchThese
     * @param array $selectColumns
     * @return mixed
     */
    public function findByColumns($matchThese, $selectColumns = array('*'));
}
