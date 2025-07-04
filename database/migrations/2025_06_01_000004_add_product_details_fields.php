<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::table('products', function (Blueprint $table) {
      $table->json('features')->nullable()->after('description');
      $table->json('specifications')->nullable()->after('features');
      $table->json('images')->nullable()->after('image_url');
      $table->decimal('rating', 2, 1)->default(0)->after('images');
      $table->integer('review_count')->default(0)->after('rating');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('products', function (Blueprint $table) {
      $table->dropColumn(['features', 'specifications', 'images', 'rating', 'review_count']);
    });
  }
};
