'use strict';

(function() {
	// People Controller Spec
	describe('People Controller Tests', function() {
		// Initialize global variables
		var PeopleController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the People controller.
			PeopleController = $controller('PeopleController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Person object fetched from XHR', inject(function(People) {
			// Create sample Person using the People service
			var samplePerson = new People({
				name: 'New Person'
			});

			// Create a sample People array that includes the new Person
			var samplePeople = [samplePerson];

			// Set GET response
			$httpBackend.expectGET('people').respond(samplePeople);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.people).toEqualData(samplePeople);
		}));

		it('$scope.findOne() should create an array with one Person object fetched from XHR using a personId URL parameter', inject(function(People) {
			// Define a sample Person object
			var samplePerson = new People({
				name: 'New Person'
			});

			// Set the URL parameter
			$stateParams.personId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/people\/([0-9a-fA-F]{24})$/).respond(samplePerson);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.person).toEqualData(samplePerson);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(People) {
			// Create a sample Person object
			var samplePersonPostData = new People({
				name: 'New Person'
			});

			// Create a sample Person response
			var samplePersonResponse = new People({
				_id: '525cf20451979dea2c000001',
				name: 'New Person'
			});

			// Fixture mock form input values
			scope.name = 'New Person';

			// Set POST response
			$httpBackend.expectPOST('people', samplePersonPostData).respond(samplePersonResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Person was created
			expect($location.path()).toBe('/people/' + samplePersonResponse._id);
		}));

		it('$scope.update() should update a valid Person', inject(function(People) {
			// Define a sample Person put data
			var samplePersonPutData = new People({
				_id: '525cf20451979dea2c000001',
				name: 'New Person'
			});

			// Mock Person in scope
			scope.person = samplePersonPutData;

			// Set PUT response
			$httpBackend.expectPUT(/people\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/people/' + samplePersonPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid personId and remove the Person from the scope', inject(function(People) {
			// Create new Person object
			var samplePerson = new People({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new People array and include the Person
			scope.people = [samplePerson];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/people\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePerson);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.people.length).toBe(0);
		}));
	});
}());