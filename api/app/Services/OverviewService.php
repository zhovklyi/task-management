<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\OverviewRepository;

class OverviewService
{
    public function __construct(
        private OverviewRepository $overviewRepository,
    ) {}

    public function getTotalOverview(User $user): array
    {
        return [
            ...$this->getTotalTasksOverview($user),
            ...$this->getCompletedTasksOverview($user),
            ...$this->getInProgressTasksOverview($user),
            ...$this->getOverdueTasksOverview($user),
        ];
    }

    /** @return array{total_tasks: int} */
    public function getTotalTasksOverview(User $user): array
    {
        return [
            'total_tasks' => $this->overviewRepository->getTotalTasksCount($user),
        ];
    }

    /** @return array{completed_tasks: int} */
    public function getCompletedTasksOverview(User $user): array
    {
        return [
            'completed_tasks' => $this->overviewRepository->getCompletedTasksCount($user),
        ];
    }

    /** @return array{in_progress_tasks: int} */
    public function getInProgressTasksOverview(User $user): array
    {
        return [
            'in_progress_tasks' => $this->overviewRepository->getInProgressTasksCount($user),
        ];
    }

    /** @return array{overdue_tasks: int} */
    public function getOverdueTasksOverview(User $user): array
    {
        return [
            'overdue_tasks' => $this->overviewRepository->getOverdueTasksCount($user),
        ];
    }
}
