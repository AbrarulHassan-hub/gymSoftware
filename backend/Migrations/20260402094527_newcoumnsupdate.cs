using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gymsoftware.Migrations
{
    /// <inheritdoc />
    public partial class newcoumnsupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Duration",
                table: "Membership",
                newName: "duration");

            migrationBuilder.RenameColumn(
                name: "Amount",
                table: "Membership",
                newName: "amount");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Membership",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "MembershipPlanName",
                table: "Membership",
                newName: "name");

            migrationBuilder.AddColumn<string>(
                name: "code",
                table: "Membership",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "code",
                table: "Membership");

            migrationBuilder.RenameColumn(
                name: "duration",
                table: "Membership",
                newName: "Duration");

            migrationBuilder.RenameColumn(
                name: "amount",
                table: "Membership",
                newName: "Amount");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Membership",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Membership",
                newName: "MembershipPlanName");
        }
    }
}
