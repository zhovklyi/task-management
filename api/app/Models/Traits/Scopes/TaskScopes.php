<?php

namespace App\Models\Traits\Scopes;

use App\Enums\TaskStatus;
use App\Models\User;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;

trait TaskScopes
{
    #[Scope]
    protected function forUser(Builder $query, User $user): void
    {
        $query->whereHas('project', function (Builder $query) use ($user) {
            $query->where('user_id', $user->id);
        });
    }

    #[Scope]
    protected function completed(Builder $query): void
    {
        $query->where('status', TaskStatus::DONE);
    }

    #[Scope]
    protected function inProgress(Builder $query): void
    {
        $query->where('status', TaskStatus::IN_PROGRESS);
    }
}
