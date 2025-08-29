<?php

namespace App\Repositories;

use App\Models\Task;
use App\Models\User;

class OverviewRepository
{
    public function __construct() {}

    public function getTotalTasksCount(User $user): int
    {
        return Task::query()
            ->forUser($user)
            ->count();
    }

    public function getCompletedTasksCount(User $user): int
    {
        return Task::query()
            ->forUser($user)
            ->completed()
            ->count();
    }

    public function getInProgressTasksCount(User $user): int
    {
        return Task::query()
            ->forUser($user)
            ->inProgress()
            ->count();
    }

    public function getOverdueTasksCount(User $user): int
    {
        return 0;
    }
}
