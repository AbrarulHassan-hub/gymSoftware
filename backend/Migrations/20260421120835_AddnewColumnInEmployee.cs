using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gymsoftware.Migrations
{
    /// <inheritdoc />
    public partial class AddnewColumnInEmployee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "status",
                table: "Employee",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "status",
                table: "Employee");
        }
    }
}
