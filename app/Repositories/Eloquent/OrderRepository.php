<?php


namespace App\Repositories\Eloquent;


use App\Repositories\Contract\OrderInterface;
use Illuminate\Container\Container as App;

class OrderRepository implements OrderInterface
{
    /**
     * @var App
     */
    private $app;

    /**
     * @var
     */
    protected $model;

    /**
     * @param App $app
     */
    public function __construct(App $app)
    {

        $this->app = $app;
        $this->makeModel();
    }

    /**
     * @return string
     */
    public function model()
    {
        return 'App\Order';
    }

    /**
     * @return Model
     */
    public function makeModel()
    {
        $model = $this->app->make($this->model());
        return $this->model = $model;
    }

    /**
     * @param array $data
     * @return mixed
     */
    public function save(array $data)
    {

        return $this->model->create($data);
    }

    /**
     * @param array $data
     * @param        $id
     * @param string $attribute
     * @return mixed
     */
    public function update(array $data, $id, $attribute = "id")
    {
        $success = $this->model->where($attribute, '=', $id)->update($data);
        if ($success) {
            return $this->model->find($id);
        }

        return $success;
    }

    /**
     * @param  $matchThese
     * @param array $selectColumns
     * @return mixed
     */
    public function findByColumns($matchThese, $selectColumns = array('*'))
    {
        return $this->model->where($matchThese)->first($selectColumns);
    }
}
