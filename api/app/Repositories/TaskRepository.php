<?php

namespace App\Repositories;

use App\Data\Task\TaskFormData;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class TaskRepository
{
    public function __construct(
        private Task $model,
    ) {}

    public function getTasksByUser(User $user): Collection
    {
        return $this->model->forUser($user)->get();
    }

    public function create(TaskFormData $data): Task
    {
        return $this->model->create([
            'title' => $data->title,
            'status' => $data->status,
            'description' => $data->description,
            'project_id' => $data->project_id,
            'priority' => $data->priority,
        ]);
    }

    public function update(Task $task, TaskFormData $data): Task
    {
        $task->update([
            'title' => $data->title,
            'status' => $data->status,
            'description' => $data->description,
            'project_id' => $data->project_id,
            'priority' => $data->priority,
        ]);

        return $task;
    }

    public function delete(Task $task): bool
    {
        return $task->delete();
    }
}
