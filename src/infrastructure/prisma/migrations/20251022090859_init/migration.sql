/*
  Warnings:

  - You are about to drop the `Axle` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Axle] DROP CONSTRAINT [Axle_wimBacklogId_fkey];

-- AlterTable
ALTER TABLE [dbo].[WimBacklog] ADD [axles] NTEXT,
[created_at] DATETIME2 NOT NULL CONSTRAINT [WimBacklog_created_at_df] DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE [dbo].[Axle];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
