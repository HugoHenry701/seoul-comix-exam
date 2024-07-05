-- CreateTable
CREATE TABLE "Restaurant" (
    "rating" INTEGER,
    "rating_count" INTEGER,
    "category" TEXT,
    "city" TEXT,
    "desc" TEXT,
    "id" TEXT NOT NULL,
    "images" TEXT[],
    "name" TEXT,
    "price_range" TEXT,
    "featuredId" TEXT NOT NULL,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feature" (
    "id" TEXT NOT NULL,
    "text" TEXT,
    "icon" TEXT,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_featuredId_key" ON "Restaurant"("featuredId");

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_featuredId_fkey" FOREIGN KEY ("featuredId") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
