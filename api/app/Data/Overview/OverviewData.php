<?php

namespace App\Data\Overview;

use Spatie\LaravelData\Data;

class OverviewData extends Data
{
    public function __construct(
        public int $total_tasks,
        public int $completed_tasks,
        public int $in_progress_tasks,
        public int $overdue_tasks,
    ) {}
}
