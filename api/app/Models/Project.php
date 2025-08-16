<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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
    /** @var list<string> */
    protected $fillable = [
        'name',
        'user_id',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /** @return BelongsTo<User, Project> */
    public function user(): BelongsTo
    {
        /** @var BelongsTo<User, Project> */
        return $this->belongsTo(User::class);
    }
}
