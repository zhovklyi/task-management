<?php

namespace App\Http\Controllers;

use App\Data\ApiResponseData;
use App\Data\Overview\OverviewData;
use App\Services\OverviewService;
use Illuminate\Http\Request;

class OverviewController extends Controller
{
    public function __construct(
        private OverviewService $overviewService,
    ) {}

    public function index(Request $request): ApiResponseData
    {
        $result = $this->overviewService->getTotalOverview($request->user());

        return ApiResponseData::success(
            data: OverviewData::from($result)
        );
    }
}
