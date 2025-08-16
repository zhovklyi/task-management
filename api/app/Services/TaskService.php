<?php

namespace App\Services;

use App\Data\Task\TaskFormData;
use App\Data\Task\TasksRequestData;
use App\Models\Task;
use App\Models\User;
use App\Models\Project;
use App\Repositories\TaskRepository;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\Collection;

class TaskService
{
    public function __construct(
        private TaskRepository $taskRepository,
    ) {}

    public function getTasks(TasksRequestData $requestData): Collection
    {
        return $this->taskRepository->getTasksByUser($requestData->user);
    }

    public function createTask(TaskFormData $taskData, User $user): Task
    {
        $project = Project::findOrFail($taskData->project_id);

        if ($project->user_id !== $user->id) {
            throw new AuthorizationException;
        }

        return $this->taskRepository->create($taskData);
    }

    public function updateTask(Task $task, TaskFormData $taskFormData, User $user): Task
    {
        $this->checkTaskOwnership($task, $user);

        return $this->taskRepository->update($task, $taskFormData);
    }

    public function getTask(Task $task, User $user): Task
    {
        $this->checkTaskOwnership($task, $user);

        return $task;
    }

    public function deleteTask(Task $task, User $user): bool
    {
        $this->checkTaskOwnership($task, $user);

        return $this->taskRepository->delete($task);
    }

    /**
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    private function checkTaskOwnership(Task $task, User $user): void
    {
        if ($task->project->user_id !== $user->id) {
            throw new AuthorizationException;
        }
    }
}
