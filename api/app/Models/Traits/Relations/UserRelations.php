<?php

namespace App\Models\Traits\Relations;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

trait UserRelations
{
    /** @return HasMany<Project, User> */
    public function projects(): HasMany
    {
        /** @var HasMany<Project, User> */
        return $this->hasMany(Project::class);
    }

    /** @return HasManyThrough<Task, Project, User> */
    public function tasks(): HasManyThrough
    {
        /** @var HasManyThrough<Task, Project, User> */
        return $this->hasManyThrough(Task::class, Project::class);
    }
}
