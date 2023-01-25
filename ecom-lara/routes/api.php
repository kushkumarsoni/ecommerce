<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);

Route::middleware(['auth:sanctum','isApiAdmin'])->group(function() {
    Route::get('/checkingAuthenticated',function(){
    	return response()->json(['message'=>'Your are in','status'=>200],200);
    });
    Route::post('logout',[AuthController::class,'logout']);
});
