<?php

namespace App\Repositories;

use App\Data\Project\ProjectFormData;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class ProjectRepository
{
    public function __construct(
        private Project $model
    ) {}

    public function findOrFail(int $id): Project
    {
        return $this->model->findOrFail($id);
    }

    public function getProjectsByUser(User $user): Collection
    {
        return $this->model->where('user_id', $user->id)->get();
    }

    public function create(User $user, ProjectFormData $data): Project
    {
        return $this->model->create([
            'name' => $data->name,
            'user_id' => $user->id,
        ]);
    }

    public function update(Project $project, ProjectFormData $data): Project
    {
        $project->update(['name' => $data->name]);

        return $project;
    }

    public function delete(Project $project): bool
    {
        return $project->delete();
    }
}
