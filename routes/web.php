<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'OrderController@index')->name('order_index');

Route::Post('/generate-grid', 'OrderController@generateGrid')->name('menu_grid');

Route::Post('/make-order', 'OrderController@createOrder')->name('create_order');
