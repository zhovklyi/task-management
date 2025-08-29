<?php

namespace App\Models;

use App\Models\Traits\Relations\ProjectRelations;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property int $user_id
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class Project extends Model
{
    use ProjectRelations;

    /** @var list<string> */
    protected $fillable = [
        'name',
        'user_id',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
