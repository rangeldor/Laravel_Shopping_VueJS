<?php

namespace App\Http\Controllers\Api\v1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Product;

class ReportController extends Controller
{
    public function __construct() 
    {
        //$this->middleware('auth:api');
    }
    
    
    public function products(Product $product, Request $request) 
    {
        $year = $request->year;

        $products = $product->where('created_at', '>=', "{$year}-01-01")
        //retorna a data do ultimo dia do ano e filtra por ela
        ->where('created_at', '<=', date('Y-m-t', strtotime("{$year}-12")))
        ->get()
        ->groupBy(function($query) {
            return $query->created_at->format('m');
        });
        
        $labels = [];
        $datasets = [];

        foreach($products as $product) 
        {
            $labels[] = "Mês {$product[0]->created_at->format('m')}";
            $datasets[] = count($product);
        }
        
        return response()->json([
            'labels'    => $labels,
            'datasets'  => $datasets,
            ]);
        }
    }
    