BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[WimBacklog] (
    [id] NVARCHAR(1000) NOT NULL,
    [crossingIndexCode] VARCHAR(64) NOT NULL,
    [datetime] DATETIME2 NOT NULL,
    [plate] NTEXT NOT NULL,
    [plate_province] NTEXT,
    [total_axles] INT NOT NULL,
    [total_length] FLOAT(53) NOT NULL,
    [total_width] FLOAT(53) NOT NULL,
    [outcome] NTEXT NOT NULL,
    [total_weight] FLOAT(53) NOT NULL,
    [weight_limit] FLOAT(53) NOT NULL,
    [speed] FLOAT(53),
    [vehicle_class] NTEXT,
    [vehicle_type] NTEXT,
    [lane] NTEXT NOT NULL CONSTRAINT [WimBacklog_lane_df] DEFAULT '1',
    [overview_image] TEXT,
    [plate_image] TEXT,
    CONSTRAINT [WimBacklog_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [WimBacklog_crossingIndexCode_key] UNIQUE NONCLUSTERED ([crossingIndexCode])
);

-- CreateTable
CREATE TABLE [dbo].[Axle] (
    [id] NVARCHAR(1000) NOT NULL,
    [wimBacklogId] NVARCHAR(1000) NOT NULL,
    [axle_no] INT NOT NULL,
    [weight] FLOAT(53) NOT NULL,
    [left_weight] FLOAT(53) NOT NULL,
    [right_weight] FLOAT(53) NOT NULL,
    CONSTRAINT [Axle_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [WimBacklog_crossingIndexCode_idx] ON [dbo].[WimBacklog]([crossingIndexCode]);

-- AddForeignKey
ALTER TABLE [dbo].[Axle] ADD CONSTRAINT [Axle_wimBacklogId_fkey] FOREIGN KEY ([wimBacklogId]) REFERENCES [dbo].[WimBacklog]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
