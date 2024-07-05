-- CreateTable
CREATE TABLE "restaurant" (
    "rating" INTEGER,
    "rating_count" INTEGER,
    "category" TEXT,
    "city" TEXT,
    "desc" TEXT,
    "id" TEXT NOT NULL,
    "images" TEXT[],
    "name" TEXT,
    "price_range" TEXT,
    "featuredtext" TEXT,
    "featuredicon" TEXT,

    CONSTRAINT "restaurant_pkey" PRIMARY KEY ("id")
);
