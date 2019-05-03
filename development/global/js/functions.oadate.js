/* ----- ----- ----- ----- ----- ----- ----- -----
   Package release {build-release}
   File UUID: bbf931c5-43bf-442b-bf9a-916e0eed411b
   ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 * Convert a date to OLE automation date
 *
 * @author Thomas Pollinger 
 * @version {build-release}
 * 
 * @this {toOADate}
 * 
 * @returns {OADate}
 */
Date.prototype.toOADate = function () {
	console.log(this);
	console.log(moment(this));
	console.log(moment(this).tz('Europe/Berlin'));
	return moment(this).toOADate();
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 * Convert an OLE automation date to date
 *
 * @author Thomas Pollinger 
 * @version {build-release}
 * 
 * @this {fromOADate}
 * 
 * @returns {Date}
 */
Number.prototype.fromOADate = function () {
	moment.fromOADate(this).tz('Europe/Berlin');
	return moment.fromOADate(this);
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 * Calibrate the date object if necessary
 *
 * @author Thomas Pollinger 
 * @version {build-release}
 * 
 * @this {calibrateDays}
 * 
 * @returns {Date}
 */
Date.prototype.calibrateDays = function (numberOfDays) {
	return new Date(
		this.getFullYear(),
		this.getMonth(),
		this.getDate() + numberOfDays,
		this.getHours(),
		this.getMinutes(),
		this.getSeconds()
	);
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */