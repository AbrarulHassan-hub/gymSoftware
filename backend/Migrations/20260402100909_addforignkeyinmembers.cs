using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gymsoftware.Migrations
{
    /// <inheritdoc />
    public partial class addforignkeyinmembers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Members_PlanId",
                table: "Members",
                column: "PlanId");

            migrationBuilder.AddForeignKey(
                name: "FK_Members_Membership_PlanId",
                table: "Members",
                column: "PlanId",
                principalTable: "Membership",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Members_Membership_PlanId",
                table: "Members");

            migrationBuilder.DropIndex(
                name: "IX_Members_PlanId",
                table: "Members");
        }
    }
}
