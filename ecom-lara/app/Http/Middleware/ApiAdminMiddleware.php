<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Auth;

class ApiAdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if(Auth::check())
        {
            if(auth()->user()->tokenCan('server:admin'))
            {
                return $next($request);
            }
            else
            {
                return response()->json([
                'status' => 403,
                'message' => 'Access Denied ! As you are not a admin',
                ],403);
            }
        }
        else
        {
            return response()->json([
                'status' => 401,
                'message' => 'Please Login First'
            ]);
        }
    }
}
