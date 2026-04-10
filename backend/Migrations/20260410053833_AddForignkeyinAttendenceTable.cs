using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gymsoftware.Migrations
{
    /// <inheritdoc />
    public partial class AddForignkeyinAttendenceTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Attendences_MemberId",
                table: "Attendences",
                column: "MemberId");

            migrationBuilder.AddForeignKey(
                name: "FK_Attendences_Members_MemberId",
                table: "Attendences",
                column: "MemberId",
                principalTable: "Members",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attendences_Members_MemberId",
                table: "Attendences");

            migrationBuilder.DropIndex(
                name: "IX_Attendences_MemberId",
                table: "Attendences");
        }
    }
}
