<?php

namespace App\Repositories;

use App\Data\Task\TaskFormData;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class TaskRepository
{
    public function __construct(
        private Task $model,
    ) {}

    public function getTasksByUser(User $user): Collection
    {
        return $this->model->whereHas(
            'project',
            function (Builder $query) use ($user) {
                $query->where('user_id', $user->id);
            }
        )->get();
    }

    public function create(TaskFormData $data): Task
    {
        return $this->model->create([
            'title' => $data->title,
            'description' => $data->description,
            'project_id' => $data->project_id,
        ]);
    }

    public function update(Task $task, TaskFormData $data): Task
    {
        $task->update([
            'title' => $data->title,
            'description' => $data->description,
            'project_id' => $data->project_id,
        ]);

        return $task;
    }

    public function delete(Task $task): bool
    {
        return $task->delete();
    }
}
