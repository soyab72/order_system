<?php

namespace App\Http\Controllers;

use App\Repositories\Contract\OrderInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{

    protected $order;

    /**
     * @param OrderInterface $order
     */
    public function __construct(OrderInterface $order)
    {
        $this->order = $order;
    }

    /**
     * App layout view
     *
     * @return mixed
     */
    public function index()
    {
        return view('layout', []);
    }

    /**
     * Dynamic generate grid
     * @param Request $request
     * @return mix
     */
    public function generateGrid(Request $request)
    {
        try {
            $requestData = $request->all();
            $columnValue = $requestData['column'];
            $rowValue = $requestData['row'];

            //Display existing data if there
            $orderData = $this->order->findByColumns(['row' => $rowValue, 'column' => $columnValue], ['menu_data']);
            $menuData = [];
            if (!empty($orderData->menu_data)) {
                $menuData = json_decode($orderData->menu_data, true);
            }
            return view('block/order-grid', ['columnValue' => $columnValue, 'rowValue' => $rowValue, 'menuData' => $menuData]);

        } catch (\Throwable $throwable) {

            $error = $throwable->getMessage() . $throwable->getLine() . $throwable->getFile();
            Log::Error($error);

        }
    }

    /**
     * Dynamic generate grid
     * @param Request $request
     * @return mix
     */
    public function createOrder(Request $request)
    {
        try {
            $saveData = [];
            $requestData = $request->all();
            $saveData['row'] = $requestData['row'];
            $saveData['column'] = $requestData['column'];
            $prepareMenuData = [
                'index' => $requestData['index'],
                'item' => $requestData['item_name'],
                'price' => $requestData['price']
            ];

            $existingMenuData = $this->order->findByColumns(['row' => $requestData['row'], 'column' => $requestData['column']], ['menu_data', 'id']);
            //If existing data found than we will update otherwise inserting new data
            if (!empty($existingMenuData)) {
                $menuData = json_decode($existingMenuData->menu_data, true);
                $menuData[$requestData['index']] = $prepareMenuData;
                $saveData['menu_data'] = json_encode($menuData);
                return $this->order->update($saveData, $existingMenuData->id);
            } else {
                $menuData[$requestData['index']] = $prepareMenuData;
                $saveData['menu_data'] = json_encode($menuData);
                return $this->order->save($saveData);
            }

        } catch (\Throwable $throwable) {

            $error = $throwable->getMessage() . $throwable->getLine() . $throwable->getFile();
            Log::Error($error);

        }
    }

}
