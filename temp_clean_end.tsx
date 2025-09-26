          
          <div className="pt-4 bg-gray-100 max-h-96 overflow-y-auto">
            <div className="px-6 pb-6">
              <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                <tbody>
                  {/* Header Row */}
                  <tr>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-black">5.0</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={5}>
                      <span className="text-sm font-bold text-black">Operational state, last date of Load test details and known defects</span>
                    </td>
                  </tr>

                  {/* Sub Header Row */}
                  <tr className="bg-[#1a2746]">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-white"></span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-white">OPS/Non-OPS</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-white">Last Load Test Date</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-white">Due Load Test Date</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-white">Remarks</span>
                    </td>
                  </tr>
                  {/* Row 1: Boat Davits */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        Boat Davits / Derricks and associated fittings<span className="text-red-500">*</span>
                      </span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.boatDavitsOps}
                        onValueChange={(value) => handleInputChange('boatDavitsOps', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ops">OPS</SelectItem>
                          <SelectItem value="non-ops">Non-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.boatDavitsLastLoadTest}
                          onChange={(e) => handleInputChange('boatDavitsLastLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.boatDavitsDueLoadTest}
                          onChange={(e) => handleInputChange('boatDavitsDueLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.boatDavitsRemarks}
                        onChange={(e) => handleInputChange('boatDavitsRemarks', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter remarks"
                      />
                    </td>
                  </tr>

                  {/* Row 2: Single arm Davit */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        Single arm Davit<span className="text-red-500">*</span>
                      </span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.singleArmDavitOps}
                        onValueChange={(value) => handleInputChange('singleArmDavitOps', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ops">OPS</SelectItem>
                          <SelectItem value="non-ops">Non-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.singleArmDavitLastLoadTest}
                          onChange={(e) => handleInputChange('singleArmDavitLastLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.singleArmDavitDueLoadTest}
                          onChange={(e) => handleInputChange('singleArmDavitDueLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.singleArmDavitRemarks}
                        onChange={(e) => handleInputChange('singleArmDavitRemarks', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter remarks"
                      />
                    </td>
                  </tr>

                  {/* Row 3: Fixed radial Davit */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        Fixed radial Davit<span className="text-red-500">*</span>
                      </span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.fixedRadialDavitOps}
                        onValueChange={(value) => handleInputChange('fixedRadialDavitOps', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ops">OPS</SelectItem>
                          <SelectItem value="non-ops">Non-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.fixedRadialDavitLastLoadTest}
                          onChange={(e) => handleInputChange('fixedRadialDavitLastLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.fixedRadialDavitDueLoadTest}
                          onChange={(e) => handleInputChange('fixedRadialDavitDueLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.fixedRadialDavitRemarks}
                        onChange={(e) => handleInputChange('fixedRadialDavitRemarks', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter remarks"
                      />
                    </td>
                  </tr>

                  {/* Row 4: Boat slings */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        Boat slings<span className="text-red-500">*</span>
                      </span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.boatSlingsOps}
                        onValueChange={(value) => handleInputChange('boatSlingsOps', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ops">OPS</SelectItem>
                          <SelectItem value="non-ops">Non-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.boatSlingsLastLoadTest}
                          onChange={(e) => handleInputChange('boatSlingsLastLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.boatSlingsDueLoadTest}
                          onChange={(e) => handleInputChange('boatSlingsDueLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.boatSlingsRemarks}
                        onChange={(e) => handleInputChange('boatSlingsRemarks', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter remarks"
                      />
                    </td>
                  </tr>

                  {/* Row 5: RAS points */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        RAS points including (portable fittings)<span className="text-red-500">*</span>
                      </span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.rasPointsOps}
                        onValueChange={(value) => handleInputChange('rasPointsOps', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ops">OPS</SelectItem>
                          <SelectItem value="non-ops">Non-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.rasPointsLastLoadTest}
                          onChange={(e) => handleInputChange('rasPointsLastLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.rasPointsDueLoadTest}
                          onChange={(e) => handleInputChange('rasPointsDueLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.rasPointsRemarks}
                        onChange={(e) => handleInputChange('rasPointsRemarks', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter remarks"
                      />
                    </td>
                  </tr>

                  {/* Row 6: Accommodation Ladder */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        Accommodation Ladder<span className="text-red-500">*</span>
                      </span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.accommodationLadderOps}
                        onValueChange={(value) => handleInputChange('accommodationLadderOps', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ops">OPS</SelectItem>
                          <SelectItem value="non-ops">Non-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.accommodationLadderLastLoadTest}
                          onChange={(e) => handleInputChange('accommodationLadderLastLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.accommodationLadderDueLoadTest}
                          onChange={(e) => handleInputChange('accommodationLadderDueLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.accommodationLadderRemarks}
                        onChange={(e) => handleInputChange('accommodationLadderRemarks', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter remarks"
                      />
                    </td>
                  </tr>

                  {/* Row 7: Booms */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        Booms<span className="text-red-500">*</span>
                      </span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.boomsOps}
                        onValueChange={(value) => handleInputChange('boomsOps', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ops">OPS</SelectItem>
                          <SelectItem value="non-ops">Non-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.boomsLastLoadTest}
                          onChange={(e) => handleInputChange('boomsLastLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.boomsDueLoadTest}
                          onChange={(e) => handleInputChange('boomsDueLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.boomsRemarks}
                        onChange={(e) => handleInputChange('boomsRemarks', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter remarks"
                      />
                    </td>
                  </tr>

                  {/* Row 8: Ships brow */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        Ships brow<span className="text-red-500">*</span>
                      </span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.shipsBrowOps}
                        onValueChange={(value) => handleInputChange('shipsBrowOps', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ops">OPS</SelectItem>
                          <SelectItem value="non-ops">Non-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.shipsBrowLastLoadTest}
                          onChange={(e) => handleInputChange('shipsBrowLastLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.shipsBrowDueLoadTest}
                          onChange={(e) => handleInputChange('shipsBrowDueLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.shipsBrowRemarks}
                        onChange={(e) => handleInputChange('shipsBrowRemarks', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter remarks"
                      />
                    </td>
                  </tr>

                  {/* Row 9: Helo deck and Hangar deck rings / eyes */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        Helo deck and Hangar deck rings / eyes<span className="text-red-500">*</span>
                      </span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.heloDeckHangarOps}
                        onValueChange={(value) => handleInputChange('heloDeckHangarOps', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ops">OPS</SelectItem>
                          <SelectItem value="non-ops">Non-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.heloDeckHangarLastLoadTest}
                          onChange={(e) => handleInputChange('heloDeckHangarLastLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.heloDeckHangarDueLoadTest}
                          onChange={(e) => handleInputChange('heloDeckHangarDueLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.heloDeckHangarRemarks}
                        onChange={(e) => handleInputChange('heloDeckHangarRemarks', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter remarks"
                      />
                    </td>
                  </tr>

                  {/* Row 10: Helo Landing Grid */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        Helo Landing Grid<span className="text-red-500">*</span>
                      </span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.heloLandingGridOps}
                        onValueChange={(value) => handleInputChange('heloLandingGridOps', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ops">OPS</SelectItem>
                          <SelectItem value="non-ops">Non-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.heloLandingGridLastLoadTest}
                          onChange={(e) => handleInputChange('heloLandingGridLastLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.heloLandingGridDueLoadTest}
                          onChange={(e) => handleInputChange('heloLandingGridDueLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.heloLandingGridRemarks}
                        onChange={(e) => handleInputChange('heloLandingGridRemarks', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter remarks"
                      />
                    </td>
                  </tr>

                  {/* Row 11: Towing arrangements / towing rope(polypropylene) */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        Towing arrangements / towing rope(polypropylene)<span className="text-red-500">*</span>
                      </span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.towingArrangementsOps}
                        onValueChange={(value) => handleInputChange('towingArrangementsOps', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ops">OPS</SelectItem>
                          <SelectItem value="non-ops">Non-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.towingArrangementsLastLoadTest}
                          onChange={(e) => handleInputChange('towingArrangementsLastLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.towingArrangementsDueLoadTest}
                          onChange={(e) => handleInputChange('towingArrangementsDueLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.towingArrangementsRemarks}
                        onChange={(e) => handleInputChange('towingArrangementsRemarks', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter remarks"
                      />
                    </td>
                  </tr>

                  {/* Row 12: Safety nets */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        Safety nets<span className="text-red-500">*</span>
                      </span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.safetyNetsOps}
                        onValueChange={(value) => handleInputChange('safetyNetsOps', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ops">OPS</SelectItem>
                          <SelectItem value="non-ops">Non-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.safetyNetsLastLoadTest}
                          onChange={(e) => handleInputChange('safetyNetsLastLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.safetyNetsDueLoadTest}
                          onChange={(e) => handleInputChange('safetyNetsDueLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.safetyNetsRemarks}
                        onChange={(e) => handleInputChange('safetyNetsRemarks', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter remarks"
                      />
                    </td>
                  </tr>

                  {/* Row 13: HO-5 hoisting arrangement */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        HO-5 hoisting arrangement<span className="text-red-500">*</span>
                      </span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.ho5HoistingOps}
                        onValueChange={(value) => handleInputChange('ho5HoistingOps', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ops">OPS</SelectItem>
                          <SelectItem value="non-ops">Non-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.ho5HoistingLastLoadTest}
                          onChange={(e) => handleInputChange('ho5HoistingLastLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.ho5HoistingDueLoadTest}
                          onChange={(e) => handleInputChange('ho5HoistingDueLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.ho5HoistingRemarks}
                        onChange={(e) => handleInputChange('ho5HoistingRemarks', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter remarks"
                      />
                    </td>
                  </tr>
                   <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        Anchor Strop<span className="text-red-500">*</span>
                      </span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.ho5HoistingOps}
                        onValueChange={(value) => handleInputChange('ho5HoistingOps', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ops">OPS</SelectItem>
                          <SelectItem value="non-ops">Non-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.ho5HoistingLastLoadTest}
                          onChange={(e) => handleInputChange('ho5HoistingLastLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.ho5HoistingDueLoadTest}
                          onChange={(e) => handleInputChange('ho5HoistingDueLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.ho5HoistingRemarks}
                        onChange={(e) => handleInputChange('ho5HoistingRemarks', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter remarks"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Systems Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="bg-[#c7d9f0] text-black px-6 py-4">
            <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">Systems</h3>
          </div>
          
          <div className="pt-4 bg-gray-100 max-h-96 overflow-y-auto">
            <div className="px-6 pb-6">
              <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                <tbody>
                  {/* 6.1 Systems Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">6.1</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">ICCP system/ Cathodic protection (NO 06/11 and NHQ Policy letter NC/ Policy/ H-77 dated 02 Mar 15)</span>
                    </td>
                  </tr>

                  {/* ICCP system row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Operational / Non operational*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.iccpSystemDetails}
                        onChange={(e) => handleInputChange('iccpSystemDetails', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter details"
                      />
                    </td>
                  </tr>

                  {/* Set potential wrt Zinc RE row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(b)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Set potential wrt Zinc RE*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.setPotentialWrtZincRE}
                        onChange={(e) => handleInputChange('setPotentialWrtZincRE', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter value"
                      />
                    </td>
                  </tr>

                  {/* Reading in panel wrt Zinc RE row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(c)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Reading in panel wrt Zinc RE*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.readingInPanelWrtZincRE}
                        onChange={(e) => handleInputChange('readingInPanelWrtZincRE', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter reading"
                      />
                    </td>
                  </tr>

                  {/* External Reading wrt portable Zinc RE row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(d)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">External Reading wrt portable Zinc RE*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.externalReadingWrtPortableZincRE}
                        onChange={(e) => handleInputChange('externalReadingWrtPortableZincRE', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter reading"
                      />
                    </td>
                  </tr>

                  {/* Last calibration date for Zinc RE row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(e)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Last calibration date for Zinc RE*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.lastCalibrationDateForZincRE}
                          onChange={(e) => handleInputChange('lastCalibrationDateForZincRE', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Known defects of ICCP system if any row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(f)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Known defects of ICCP system if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.knownDefectsOfICCP}
                        onChange={(e) => handleInputChange('knownDefectsOfICCP', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter defects if any"
                      />
                    </td>
                  </tr>

                  {/* 6.2 Ventilation System Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">6.2</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-bold text-white">Ventilation system</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.ventilationSystemOperational}
                        onValueChange={(value) => handleInputChange('ventilationSystemOperational', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="operational">Operational</SelectItem>
                          <SelectItem value="non-operational">Non operational</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      {/* Blank column */}
                    </td>
                  </tr>

                  {/* Details of defects row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Details of defects*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="space-y-4">
                        {/* Enter Total Number of Rows */}
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-700">Enter Total Number of Rows.</span>
                          <Input
                            type="number"
                            min="0"
                            value={formData.detailsOfDefectsRows}
                            onChange={(e) => handleInputChange('detailsOfDefectsRows', parseInt(e.target.value) || 0)}
                            className="w-20 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-0 text-black"
                          />
                        </div>
                        
                        {/* Custom Table */}
                        <div className={`${formData.detailsOfDefectsRows > 5 ? 'max-h-80 overflow-y-auto' : ''}`}>
                          <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                            <thead className="sticky top-0">
                              <tr className="bg-[#1a2746] text-white">
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium" rowSpan={2}>Sr No.</th>
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium" rowSpan={2}>Location*</th>
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium" colSpan={2}>Frame Station</th>
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium" rowSpan={2}>Remarks*</th>
                              </tr>
                              <tr className="bg-[#1a2746] text-white">
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">From</th>
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">To</th>
                              </tr>
                            </thead>
                            <tbody>
                              {formData.detailsOfDefectsRows === 0 ? (
                                <tr>
                                  <td colSpan={5} className="border border-gray-300 px-3 py-8 text-center text-gray-500 italic">
                                    No rows added yet. Increase the count above to add observations.
                                  </td>
                                </tr>
                              ) : (
                                Array.from({ length: formData.detailsOfDefectsRows }, (_, index) => (
                                  <tr key={index} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                                      ({String.fromCharCode(97 + index)})
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2">
                                      <Input
                                        type="text"
                                        value={formData.detailsOfDefectsData[index]?.observation || ''}
                                        onChange={(e) => {
                                          const updatedData = [...formData.detailsOfDefectsData];
                                          updatedData[index] = {
                                            ...updatedData[index],
                                            observation: e.target.value,
                                            remarks: updatedData[index]?.remarks || ''
                                          };
                                          setFormData(prev => ({ ...prev, detailsOfDefectsData: updatedData }));
                                        }}
                                        className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                                        placeholder="Enter location"
                                        required
                                      />
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2">
                                      <Input
                                        type="text"
                                        value={formData.detailsOfDefectsData[index]?.frameStationFrom || ''}
                                        onChange={(e) => {
                                          const updatedData = [...formData.detailsOfDefectsData];
                                          updatedData[index] = {
                                            ...updatedData[index],
                                            frameStationFrom: e.target.value,
                                            observation: updatedData[index]?.observation || '',
                                            remarks: updatedData[index]?.remarks || ''
                                          };
                                          setFormData(prev => ({ ...prev, detailsOfDefectsData: updatedData }));
                                        }}
                                        className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                                        placeholder="From"
                                        required
                                      />
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2">
                                      <Input
                                        type="text"
                                        value={formData.detailsOfDefectsData[index]?.frameStationTo || ''}
                                        onChange={(e) => {
                                          const updatedData = [...formData.detailsOfDefectsData];
                                          updatedData[index] = {
                                            ...updatedData[index],
                                            frameStationTo: e.target.value,
                                            observation: updatedData[index]?.observation || '',
                                            remarks: updatedData[index]?.remarks || ''
                                          };
                                          setFormData(prev => ({ ...prev, detailsOfDefectsData: updatedData }));
                                        }}
                                        className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                                        placeholder="To"
                                        required
                                      />
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2">
                                      <Input
                                        type="text"
                                        value={formData.detailsOfDefectsData[index]?.remarks || ''}
                                        onChange={(e) => {
                                          const updatedData = [...formData.detailsOfDefectsData];
                                          updatedData[index] = {
                                            ...updatedData[index],
                                            remarks: e.target.value,
                                            observation: updatedData[index]?.observation || ''
                                          };
                                          setFormData(prev => ({ ...prev, detailsOfDefectsData: updatedData }));
                                        }}
                                        className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                                        placeholder="Enter remarks"
                                        required
                                      />
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* State of ATU Ops row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(b)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">State of ATU Ops*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.stateOfATUOps}
                        onChange={(e) => handleInputChange('stateOfATUOps', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter ATU Ops state"
                      />
                    </td>
                  </tr>

                  {/* State of ATU Non ops row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(c)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">State of ATU Non ops*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.stateOfATUNonOps}
                        onChange={(e) => handleInputChange('stateOfATUNonOps', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter ATU Non ops state"
                      />
                    </td>
                  </tr>

                  {/* ATU Routines row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(d)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">ATU Routines*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.atuRoutines}
                        onChange={(e) => handleInputChange('atuRoutines', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter ATU routines"
                      />
                    </td>
                  </tr>

                  {/* State of HEs row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(e)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">State of HEs*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.stateOfHEs}
                        onChange={(e) => handleInputChange('stateOfHEs', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter HEs state"
                      />
                    </td>
                  </tr>

                  {/* Choking of trunkings if any row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(f)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Choking of trunkings if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="space-y-4">
                        {/* Custom 2-Column Table */}
                        <div className={`${formData.chokingTrunkingsRows > 5 ? 'max-h-80 overflow-y-auto' : ''}`}>
                          <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                            <thead className="sticky top-0">
                              <tr className="bg-[#1a2746] text-white">
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Sr No.</th>
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">
                                  <div className="flex items-center space-x-2">
                                    <span>Enter Total Number of Rows.</span>
                                    <Input
                                      type="number"
                                      min="0"
                                      value={formData.chokingTrunkingsRows}
                                      onChange={(e) => handleInputChange('chokingTrunkingsRows', parseInt(e.target.value) || 0)}
                                      className="w-20 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-0 text-black"
                                    />
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {formData.chokingTrunkingsRows === 0 ? (
                                <tr>
                                  <td colSpan={2} className="border border-gray-300 px-3 py-8 text-center text-gray-500 italic">
                                    No rows added yet. Increase the count above to add observations.
                                  </td>
                                </tr>
                              ) : (
                                Array.from({ length: formData.chokingTrunkingsRows }, (_, index) => (
                                  <tr key={index} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                                      ({String.fromCharCode(97 + index)})
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2">
                                      <Input
                                        type="text"
                                        value={formData.chokingTrunkingsData[index]?.observation || ''}
                                        onChange={(e) => {
                                          const updatedData = [...formData.chokingTrunkingsData];
                                          updatedData[index] = {
                                            ...updatedData[index],
                                            observation: e.target.value,
                                            remarks: updatedData[index]?.remarks || ''
                                          };
                                          setFormData(prev => ({ ...prev, chokingTrunkingsData: updatedData }));
                                        }}
                                        className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                                        placeholder="Enter observation"
                                        required
                                      />
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* 6.3 Fresh water systems Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">6.3</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-bold text-white">Fresh water systems</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.freshWaterSystemsStatus}
                        onValueChange={(value) => handleInputChange('freshWaterSystemsStatus', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="OPS">OPS</SelectItem>
                          <SelectItem value="NON-OPS">NON-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      {/* Blank column */}
                    </td>
                  </tr>

                  {/* Details of defects if any row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Details of defects if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="space-y-4">
                        {/* Custom 2-Column Table */}
                        <div className={`${formData.freshWaterSystemsRows > 5 ? 'max-h-80 overflow-y-auto' : ''}`}>
                          <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                            <thead className="sticky top-0">
                              <tr className="bg-[#1a2746] text-white">
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Sr No.</th>
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">
                                  <div className="flex items-center space-x-2">
                                    <span>Enter Total Number of Rows.</span>
                                    <Input
                                      type="number"
                                      min="0"
                                      value={formData.freshWaterSystemsRows}
                                      onChange={(e) => handleInputChange('freshWaterSystemsRows', parseInt(e.target.value) || 0)}
                                      className="w-20 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-0 text-black"
                                    />
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {formData.freshWaterSystemsRows === 0 ? (
                                <tr>
                                  <td colSpan={2} className="border border-gray-300 px-3 py-8 text-center text-gray-500 italic">
                                    No rows added yet. Increase the count above to add observations.
                                  </td>
                                </tr>
                              ) : (
                                Array.from({ length: formData.freshWaterSystemsRows }, (_, index) => (
                                  <tr key={index} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                                      ({String.fromCharCode(97 + index)})
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2">
                                      <Input
                                        type="text"
                                        value={formData.freshWaterSystemsData[index]?.observation || ''}
                                        onChange={(e) => {
                                          const updatedData = [...formData.freshWaterSystemsData];
                                          updatedData[index] = {
                                            ...updatedData[index],
                                            observation: e.target.value,
                                            remarks: updatedData[index]?.remarks || ''
                                          };
                                          setFormData(prev => ({ ...prev, freshWaterSystemsData: updatedData }));
                                        }}
                                        className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                                        placeholder="Enter observation"
                                        required
                                      />
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* 6.4 Sewage treatment plant Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">6.4</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Sewage treatment plant</span>
                    </td>
                  </tr>

                  {/* Name / make / type row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Name / make / type*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.sewagePlantNameMakeType}
                        onChange={(e) => handleInputChange('sewagePlantNameMakeType', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter name/make/type"
                      />
                    </td>
                  </tr>

                  {/* Operational / Non Operational row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(b)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Operational / Non Operational*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.sewagePlantOperational}
                        onValueChange={(value) => handleInputChange('sewagePlantOperational', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="operational">Operational</SelectItem>
                          <SelectItem value="non-operational">Non operational</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* Details of defects if any row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(c)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Details of defects if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="space-y-4">
                        {/* Enter Total Number of Rows */}
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-700">Enter Total Number of Rows.</span>
                          <Input
                            type="number"
                            min="0"
                            value={formData.sewagePlantDefectsRows}
                            onChange={(e) => handleInputChange('sewagePlantDefectsRows', parseInt(e.target.value) || 0)}
                            className="w-20 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-0 text-black"
                          />
                        </div>
                        
                        {/* Custom Table */}
                        <div className={`${formData.sewagePlantDefectsRows > 5 ? 'max-h-80 overflow-y-auto' : ''}`}>
                          <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                            <thead className="sticky top-0">
                              <tr className="bg-[#1a2746] text-white">
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium" rowSpan={2}>Sr No.</th>
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium" rowSpan={2}>Equipment*</th>
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium" rowSpan={2}>Location*</th>
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium" colSpan={2}>Frame Station</th>
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium" rowSpan={2}>Remarks*</th>
                              </tr>
                              <tr className="bg-[#1a2746] text-white">
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">From</th>
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">To</th>
                              </tr>
                            </thead>
                            <tbody>
                              {formData.sewagePlantDefectsRows === 0 ? (
                                <tr>
                                  <td colSpan={6} className="border border-gray-300 px-3 py-8 text-center text-gray-500 italic">
                                    No rows added yet. Increase the count above to add observations.
                                  </td>
                                </tr>
                              ) : (
                                Array.from({ length: formData.sewagePlantDefectsRows }, (_, index) => (
                                  <tr key={index} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                                      ({String.fromCharCode(97 + index)})
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2">
                                      <Input
                                        type="text"
                                        value={formData.sewagePlantDefectsData[index]?.equipment || ''}
                                        onChange={(e) => {
                                          const updatedData = [...formData.sewagePlantDefectsData];
                                          updatedData[index] = {
                                            ...updatedData[index],
                                            equipment: e.target.value,
                                            observation: updatedData[index]?.observation || '',
                                            remarks: updatedData[index]?.remarks || ''
                                          };
                                          setFormData(prev => ({ ...prev, sewagePlantDefectsData: updatedData }));
                                        }}
                                        className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                                        placeholder="Enter equipment"
                                        required
                                      />
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2">
                                      <Input
                                        type="text"
                                        value={formData.sewagePlantDefectsData[index]?.observation || ''}
                                        onChange={(e) => {
                                          const updatedData = [...formData.sewagePlantDefectsData];
                                          updatedData[index] = {
                                            ...updatedData[index],
                                            observation: e.target.value,
                                            equipment: updatedData[index]?.equipment || '',
                                            remarks: updatedData[index]?.remarks || ''
                                          };
                                          setFormData(prev => ({ ...prev, sewagePlantDefectsData: updatedData }));
                                        }}
                                        className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                                        placeholder="Enter location"
                                        required
                                      />
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2">
                                      <Input
                                        type="text"
                                        value={formData.sewagePlantDefectsData[index]?.frameStationFrom || ''}
                                        onChange={(e) => {
                                          const updatedData = [...formData.sewagePlantDefectsData];
                                          updatedData[index] = {
                                            ...updatedData[index],
                                            frameStationFrom: e.target.value,
                                            equipment: updatedData[index]?.equipment || '',
                                            observation: updatedData[index]?.observation || '',
                                            remarks: updatedData[index]?.remarks || ''
                                          };
                                          setFormData(prev => ({ ...prev, sewagePlantDefectsData: updatedData }));
                                        }}
                                        className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                                        placeholder="From"
                                        required
                                      />
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2">
                                      <Input
                                        type="text"
                                        value={formData.sewagePlantDefectsData[index]?.frameStationTo || ''}
                                        onChange={(e) => {
                                          const updatedData = [...formData.sewagePlantDefectsData];
                                          updatedData[index] = {
                                            ...updatedData[index],
                                            frameStationTo: e.target.value,
                                            equipment: updatedData[index]?.equipment || '',
                                            observation: updatedData[index]?.observation || '',
                                            remarks: updatedData[index]?.remarks || ''
                                          };
                                          setFormData(prev => ({ ...prev, sewagePlantDefectsData: updatedData }));
                                        }}
                                        className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                                        placeholder="To"
                                        required
                                      />
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2">
                                      <Input
                                        type="text"
                                        value={formData.sewagePlantDefectsData[index]?.remarks || ''}
                                        onChange={(e) => {
                                          const updatedData = [...formData.sewagePlantDefectsData];
                                          updatedData[index] = {
                                            ...updatedData[index],
                                            remarks: e.target.value,
                                            equipment: updatedData[index]?.equipment || '',
                                            observation: updatedData[index]?.observation || ''
                                          };
                                          setFormData(prev => ({ ...prev, sewagePlantDefectsData: updatedData }));
                                        }}
                                        className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                                        placeholder="Enter remarks"
                                        required
                                      />
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* Whether Routine undertaken IAW manual row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(d)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Whether Routine undertaken IAW manual*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.sewagePlantRoutineIAWManual}
                        onValueChange={(value) => handleInputChange('sewagePlantRoutineIAWManual', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sat">SAT</SelectItem>
                          <SelectItem value="unsat">UNSAT</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* Details of last effluent test and result row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(e)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Details of last effluent test and result*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.sewagePlantEffluentTestResult}
                        onValueChange={(value) => handleInputChange('sewagePlantEffluentTestResult', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sat">SAT</SelectItem>
                          <SelectItem value="unsat">UNSAT</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* 6.5 Pre-wetting system Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">6.5</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Pre-wetting system</span>
                    </td>
                  </tr>

                  {/* Operational / Non Operational row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Operational / Non Operational*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.preWettingSystemOperational}
                        onValueChange={(value) => handleInputChange('preWettingSystemOperational', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="operational">Operational</SelectItem>
                          <SelectItem value="non-operational">Non operational</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* Date last operated row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(b)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Date last operated*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.preWettingSystemDateLastOperated}
                          onChange={(e) => handleInputChange('preWettingSystemDateLastOperated', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Details of defects if any row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(c)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Details of defects if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.preWettingSystemDefects}
                        onChange={(e) => handleInputChange('preWettingSystemDefects', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter defect details"
                      />
                    </td>
                  </tr>

                  {/* 6.6 Sanitary system Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">6.6</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Sanitary system</span>
                    </td>
                  </tr>

                  {/* Defects if any row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Defects if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.sanitarySystemDefects}
                        onChange={(e) => handleInputChange('sanitarySystemDefects', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter defects if any"
                      />
                    </td>
                  </tr>

                  {/* Chokes if any row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(b)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Chokes if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.sanitarySystemChokes}
                        onChange={(e) => handleInputChange('sanitarySystemChokes', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter chokes if any"
                      />
                    </td>
                  </tr>

                  {/* State of flushing valves row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(c)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">State of flushing valves*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.sanitarySystemFlushingValves}
                        onChange={(e) => handleInputChange('sanitarySystemFlushingValves', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter flushing valves state"
                      />
                    </td>
                  </tr>

                  {/* State of OBD valves row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(d)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">State of OBD valves*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.sanitarySystemOBDValves}
                        onChange={(e) => handleInputChange('sanitarySystemOBDValves', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter OBD valves state"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Hull Equipment Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="bg-[#c7d9f0] text-black px-6 py-4">
            <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">Hull Equipment</h3>
          </div>
          
          <div className="pt-4 bg-gray-100 max-h-96 overflow-y-auto">
            <div className="px-6 pb-6">
              <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                <tbody>
                  {/* 7.1 Anchor chain cable and associated fittings Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">7.1</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Anchor chain cable and associated fittings</span>
                    </td>
                  </tr>

                  {/* Last survey details row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Last survey details (NO 07/11)*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.anchorChainCableLastSurvey}
                          onChange={(e) => handleInputChange('anchorChainCableLastSurvey', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Date of Load test row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(b)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Date of Load test*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.dateOfLoadTest}
                          onChange={(e) => handleInputChange('dateOfLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Anchor Strop row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(ii)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Anchor Strop*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.anchorStrop}
                        onValueChange={(value) => handleInputChange('anchorStrop', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sat">SAT</SelectItem>
                          <SelectItem value="unsat">UNSAT</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* Blake Slip row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(iii)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Blake Slip*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.blakeSlip}
                        onValueChange={(value) => handleInputChange('blakeSlip', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sat">SAT</SelectItem>
                          <SelectItem value="unsat">UNSAT</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* Compressor row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(iv)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Compressor*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.compressor}
                        onValueChange={(value) => handleInputChange('compressor', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sat">SAT</SelectItem>
                          <SelectItem value="unsat">UNSAT</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* BER items if any row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(c)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">BER items if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="space-y-4">
                        {/* Custom 2-Column Table */}
                        <div className={`${formData.berItemsRows > 5 ? 'max-h-80 overflow-y-auto' : ''}`}>
                          <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                            <thead className="sticky top-0">
                              <tr className="bg-[#1a2746] text-white">
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Sr No.</th>
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">
                                  <div className="flex items-center space-x-2">
                                    <span>Enter Total Number of Rows.</span>
                                    <Input
                                      type="number"
                                      min="0"
                                      value={formData.berItemsRows}
                                      onChange={(e) => handleInputChange('berItemsRows', parseInt(e.target.value) || 0)}
                                      className="w-20 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-0 text-black"
                                    />
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {formData.berItemsRows === 0 ? (
                                <tr>
                                  <td colSpan={2} className="border border-gray-300 px-3 py-8 text-center text-gray-500 italic">
                                    No rows added yet. Increase the count above to add observations.
                                  </td>
                                </tr>
                              ) : (
                                Array.from({ length: formData.berItemsRows }, (_, index) => (
                                  <tr key={index} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                                      ({String.fromCharCode(97 + index)})
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2">
                                      <Input
                                        type="text"
                                        value={formData.berItemsData[index]?.observation || ''}
                                        onChange={(e) => {
                                          const updatedData = [...formData.berItemsData];
                                          updatedData[index] = {
                                            ...updatedData[index],
                                            observation: e.target.value
                                          };
                                          setFormData(prev => ({ ...prev, berItemsData: updatedData }));
                                        }}
                                        className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                                        placeholder="Enter observation"
                                        required
                                      />
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* Deficiency if any row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(d)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Deficiency if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="space-y-4">
                        {/* Custom 2-Column Table */}
                        <div className={`${formData.deficiencyRows > 5 ? 'max-h-80 overflow-y-auto' : ''}`}>
                          <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                            <thead className="sticky top-0">
                              <tr className="bg-[#1a2746] text-white">
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Sr No.</th>
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">
                                  <div className="flex items-center space-x-2">
                                    <span>Enter Total Number of Rows.</span>
                                    <Input
                                      type="number"
                                      min="0"
                                      value={formData.deficiencyRows}
                                      onChange={(e) => handleInputChange('deficiencyRows', parseInt(e.target.value) || 0)}
                                      className="w-20 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-0 text-black"
                                    />
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {formData.deficiencyRows === 0 ? (
                                <tr>
                                  <td colSpan={2} className="border border-gray-300 px-3 py-8 text-center text-gray-500 italic">
                                    No rows added yet. Increase the count above to add observations.
                                  </td>
                                </tr>
                              ) : (
                                Array.from({ length: formData.deficiencyRows }, (_, index) => (
                                  <tr key={index} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                                      ({String.fromCharCode(97 + index)})
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2">
                                      <Input
                                        type="text"
                                        value={formData.deficiencyData[index]?.observation || ''}
                                        onChange={(e) => {
                                          const updatedData = [...formData.deficiencyData];
                                          updatedData[index] = {
                                            ...updatedData[index],
                                            observation: e.target.value
                                          };
                                          setFormData(prev => ({ ...prev, deficiencyData: updatedData }));
                                        }}
                                        className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                                        placeholder="Enter observation"
                                        required
                                      />
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* 7.2 Capstan and Cable Holders Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">7.2</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Capstan and Cable Holders</span>
                    </td>
                  </tr>

                  {/* Capstan Defects if any row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Defects if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="space-y-4">
                        {/* Custom 2-Column Table */}
                        <div className={`${formData.capstanDefectsRows > 5 ? 'max-h-80 overflow-y-auto' : ''}`}>
                          <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                            <thead className="sticky top-0">
                              <tr className="bg-[#1a2746] text-white">
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Sr No.</th>
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">
                                  <div className="flex items-center space-x-2">
                                    <span>Enter Total Number of Rows.</span>
                                    <Input
                                      type="number"
                                      min="0"
                                      value={formData.capstanDefectsRows}
                                      onChange={(e) => handleInputChange('capstanDefectsRows', parseInt(e.target.value) || 0)}
                                      className="w-20 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-0 text-black"
                                    />
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {formData.capstanDefectsRows === 0 ? (
                                <tr>
                                  <td colSpan={2} className="border border-gray-300 px-3 py-8 text-center text-gray-500 italic">
                                    No rows added yet. Increase the count above to add observations.
                                  </td>
                                </tr>
                              ) : (
                                Array.from({ length: formData.capstanDefectsRows }, (_, index) => (
                                  <tr key={index} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                                      ({String.fromCharCode(97 + index)})
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2">
                                      <Input
                                        type="text"
                                        value={formData.capstanDefectsData[index]?.observation || ''}
                                        onChange={(e) => {
                                          const updatedData = [...formData.capstanDefectsData];
                                          updatedData[index] = {
                                            ...updatedData[index],
                                            observation: e.target.value
                                          };
                                          setFormData(prev => ({ ...prev, capstanDefectsData: updatedData }));
                                        }}
                                        className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                                        placeholder="Enter observation"
                                        required
                                      />
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* 7.3 Winches Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">7.3</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Winches</span>
                    </td>
                  </tr>

                  {/* Winches Defects if any row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Defects if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="space-y-4">
                        {/* Custom 2-Column Table */}
                        <div className={`${formData.winchesDefectsRows > 5 ? 'max-h-80 overflow-y-auto' : ''}`}>
                          <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                            <thead className="sticky top-0">
                              <tr className="bg-[#1a2746] text-white">
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Sr No.</th>
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">
                                  <div className="flex items-center space-x-2">
                                    <span>Enter Total Number of Rows.</span>
                                    <Input
                                      type="number"
                                      min="0"
                                      value={formData.winchesDefectsRows}
                                      onChange={(e) => handleInputChange('winchesDefectsRows', parseInt(e.target.value) || 0)}
                                      className="w-20 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-0 text-black"
                                    />
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {formData.winchesDefectsRows === 0 ? (
                                <tr>
                                  <td colSpan={2} className="border border-gray-300 px-3 py-8 text-center text-gray-500 italic">
                                    No rows added yet. Increase the count above to add observations.
                                  </td>
                                </tr>
                              ) : (
                                Array.from({ length: formData.winchesDefectsRows }, (_, index) => (
                                  <tr key={index} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                                      ({String.fromCharCode(97 + index)})
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2">
                                      <Input
                                        type="text"
                                        value={formData.winchesDefectsData[index]?.observation || ''}
                                        onChange={(e) => {
                                          const updatedData = [...formData.winchesDefectsData];
                                          updatedData[index] = {
                                            ...updatedData[index],
                                            observation: e.target.value
                                          };
                                          setFormData(prev => ({ ...prev, winchesDefectsData: updatedData }));
                                        }}
                                        className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                                        placeholder="Enter observation"
                                        required
                                      />
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* 7.4 Crane Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">7.4</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Crane</span>
                    </td>
                  </tr>

                  {/* Crane Defects if any row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Defects if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="space-y-4">
                        {/* Custom 2-Column Table */}
                        <div className={`${formData.craneDefectsRows > 5 ? 'max-h-80 overflow-y-auto' : ''}`}>
                          <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                            <thead className="sticky top-0">
                              <tr className="bg-[#1a2746] text-white">
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Sr No.</th>
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">
                                  <div className="flex items-center space-x-2">
                                    <span>Enter Total Number of Rows.</span>
                                    <Input
                                      type="number"
                                      min="0"
                                      value={formData.craneDefectsRows}
                                      onChange={(e) => handleInputChange('craneDefectsRows', parseInt(e.target.value) || 0)}
                                      className="w-20 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-0 text-black"
                                    />
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {formData.craneDefectsRows === 0 ? (
                                <tr>
                                  <td colSpan={2} className="border border-gray-300 px-3 py-8 text-center text-gray-500 italic">
                                    No rows added yet. Increase the count above to add observations.
                                  </td>
                                </tr>
                              ) : (
                                Array.from({ length: formData.craneDefectsRows }, (_, index) => (
                                  <tr key={index} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                                      ({String.fromCharCode(97 + index)})
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2">
                                      <Input
                                        type="text"
                                        value={formData.craneDefectsData[index]?.observation || ''}
                                        onChange={(e) => {
                                          const updatedData = [...formData.craneDefectsData];
                                          updatedData[index] = {
                                            ...updatedData[index],
                                            observation: e.target.value
                                          };
                                          setFormData(prev => ({ ...prev, craneDefectsData: updatedData }));
                                        }}
                                        className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                                        placeholder="Enter observation"
                                        required
                                      />
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* 7.5 Hangar Shutter Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">7.5</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Hangar Shutter</span>
                    </td>
                  </tr>

                  {/* Hangar Shutter Defects if any row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Defects if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="space-y-4">
                        {/* Custom 2-Column Table */}
                        <div className={`${formData.hangarShutterDefectsRows > 5 ? 'max-h-80 overflow-y-auto' : ''}`}>
                          <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                            <thead className="sticky top-0">
                              <tr className="bg-[#1a2746] text-white">
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Sr No.</th>
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">
                                  <div className="flex items-center space-x-2">
                                    <span>Enter Total Number of Rows.</span>
                                    <Input
                                      type="number"
                                      min="0"
                                      value={formData.hangarShutterDefectsRows}
                                      onChange={(e) => handleInputChange('hangarShutterDefectsRows', parseInt(e.target.value) || 0)}
                                      className="w-20 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-0 text-black"
                                    />
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {formData.hangarShutterDefectsRows === 0 ? (
                                <tr>
                                  <td colSpan={2} className="border border-gray-300 px-3 py-8 text-center text-gray-500 italic">
                                    No rows added yet. Increase the count above to add observations.
                                  </td>
                                </tr>
                              ) : (
                                Array.from({ length: formData.hangarShutterDefectsRows }, (_, index) => (
                                  <tr key={index} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                                      ({String.fromCharCode(97 + index)})
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2">
                                      <Input
                                        type="text"
                                        value={formData.hangarShutterDefectsData[index]?.observation || ''}
                                        onChange={(e) => {
                                          const updatedData = [...formData.hangarShutterDefectsData];
                                          updatedData[index] = {
                                            ...updatedData[index],
                                            observation: e.target.value
                                          };
                                          setFormData(prev => ({ ...prev, hangarShutterDefectsData: updatedData }));
                                        }}
                                        className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                                        placeholder="Enter observation"
                                        required
                                      />
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* 7.6 Boom Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">7.6</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Boom</span>
                    </td>
                  </tr>

                  {/* Boom Defects if any row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Defects if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="space-y-4">
                        {/* Custom 2-Column Table */}
                        <div className={`${formData.boomDefectsRows > 5 ? 'max-h-80 overflow-y-auto' : ''}`}>
                          <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                            <thead className="sticky top-0">
                              <tr className="bg-[#1a2746] text-white">
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Sr No.</th>
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">
                                  <div className="flex items-center space-x-2">
                                    <span>Enter Total Number of Rows.</span>
                                    <Input
                                      type="number"
                                      min="0"
                                      value={formData.boomDefectsRows}
                                      onChange={(e) => handleInputChange('boomDefectsRows', parseInt(e.target.value) || 0)}
                                      className="w-20 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-0 text-black"
                                    />
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {formData.boomDefectsRows === 0 ? (
                                <tr>
                                  <td colSpan={2} className="border border-gray-300 px-3 py-8 text-center text-gray-500 italic">
                                    No rows added yet. Increase the count above to add observations.
                                  </td>
                                </tr>
                              ) : (
                                Array.from({ length: formData.boomDefectsRows }, (_, index) => (
                                  <tr key={index} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                                      ({String.fromCharCode(97 + index)})
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2">
                                      <Input
                                        type="text"
                                        value={formData.boomDefectsData[index]?.observation || ''}
                                        onChange={(e) => {
                                          const updatedData = [...formData.boomDefectsData];
                                          updatedData[index] = {
                                            ...updatedData[index],
                                            observation: e.target.value
                                          };
                                          setFormData(prev => ({ ...prev, boomDefectsData: updatedData }));
                                        }}
                                        className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                                        placeholder="Enter observation"
                                        required
                                      />
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* 7.7 A's & A's / ABER Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">7.7</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">A's & A's / ABER</span>
                    </td>
                  </tr>

                  {/* A's & A's / ABER Defects if any row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Defects if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="space-y-4">
                        {/* Custom 2-Column Table */}
                        <div className={`${formData.asAberDefectsRows > 5 ? 'max-h-80 overflow-y-auto' : ''}`}>
                          <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                            <thead className="sticky top-0">
                              <tr className="bg-[#1a2746] text-white">
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Sr No.</th>
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">
                                  <div className="flex items-center space-x-2">
                                    <span>Enter Total Number of Rows.</span>
                                    <Input
                                      type="number"
                                      min="0"
                                      value={formData.asAberDefectsRows}
                                      onChange={(e) => handleInputChange('asAberDefectsRows', parseInt(e.target.value) || 0)}
                                      className="w-20 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-0 text-black"
                                    />
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {formData.asAberDefectsRows === 0 ? (
                                <tr>
                                  <td colSpan={2} className="border border-gray-300 px-3 py-8 text-center text-gray-500 italic">
                                    No rows added yet. Increase the count above to add observations.
                                  </td>
                                </tr>
                              ) : (
                                Array.from({ length: formData.asAberDefectsRows }, (_, index) => (
                                  <tr key={index} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                                      ({String.fromCharCode(97 + index)})
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2">
                                      <Input
                                        type="text"
                                        value={formData.asAberDefectsData[index]?.observation || ''}
                                        onChange={(e) => {
                                          const updatedData = [...formData.asAberDefectsData];
                                          updatedData[index] = {
                                            ...updatedData[index],
                                            observation: e.target.value
                                          };
                                          setFormData(prev => ({ ...prev, asAberDefectsData: updatedData }));
                                        }}
                                        className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                                        placeholder="Enter observation"
                                        required
                                      />
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Life Saving Appliances Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="bg-[#c7d9f0] text-black px-6 py-4">
            <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">Life Saving Appliances</h3>
          </div>
          
          <div className="pt-4 bg-gray-100 max-h-96 overflow-y-auto">
            <div className="px-6 pb-6">
              <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                <tbody>
                  {/* 8.1 Boats Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">8.1</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Boats</span>
                    </td>
                  </tr>

                  {/* Authorisation row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Authorisation*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.boatsAuthorisation}
                        onChange={(e) => handleInputChange('boatsAuthorisation', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter authorisation details"
                      />
                    </td>
                  </tr>

                  {/* Held / Deficiency on board row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(b)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Held / Deficiency on board*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.boatsHeldDeficiency}
                        onChange={(e) => handleInputChange('boatsHeldDeficiency', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter details"
                      />
                    </td>
                  </tr>

                  {/* BER row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(c)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">BER*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.boatsBer}
                        onChange={(e) => handleInputChange('boatsBer', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter BER details"
                      />
                    </td>
                  </tr>

                  {/* Landed for repairs row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(d)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Landed for repairs*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.boatsLandedForRepairs}
                        onChange={(e) => handleInputChange('boatsLandedForRepairs', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter repair details"
                      />
                    </td>
                  </tr>

                  {/* Defects if any row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(e)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Defects if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="space-y-4">
                        {/* Enter Total Number of Rows */}
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-700">Enter Total Number of Rows.</span>
                          <Input
                            type="number"
                            min="0"
                            value={formData.boatsDefectsRows}
                            onChange={(e) => handleInputChange('boatsDefectsRows', parseInt(e.target.value) || 0)}
                            className="w-20 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-0 text-black"
                          />
                        </div>
                        
                        {/* Custom Table */}
                        <div className={`${formData.boatsDefectsRows > 5 ? 'max-h-80 overflow-y-auto' : ''}`}>
                          <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                            <thead className="sticky top-0">
                              <tr className="bg-[#1a2746] text-white">
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Sr No.</th>
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Equipment*</th>
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Location*</th>
                                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Remarks*</th>
                              </tr>
                            </thead>
                            <tbody>
                              {formData.boatsDefectsRows === 0 ? (
                                <tr>
                                  <td colSpan={4} className="border border-gray-300 px-3 py-8 text-center text-gray-500 italic">
                                    No rows added yet. Increase the count above to add observations.
                                  </td>
                                </tr>
                              ) : (
                                Array.from({ length: formData.boatsDefectsRows }, (_, index) => (
                                  <tr key={index} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                                      ({String.fromCharCode(97 + index)})
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2">
                                      <Input
                                        type="text"
                                        value={formData.boatsDefectsData[index]?.equipment || ''}
                                        onChange={(e) => {
                                          const updatedData = [...formData.boatsDefectsData];
                                          updatedData[index] = {
                                            ...updatedData[index],
                                            equipment: e.target.value,
                                            observation: updatedData[index]?.observation || '',
                                            remarks: updatedData[index]?.remarks || ''
                                          };
                                          setFormData(prev => ({ ...prev, boatsDefectsData: updatedData }));
                                        }}
                                        className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                                        placeholder="Enter equipment"
                                        required
                                      />
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2">
                                      <Input
                                        type="text"
                                        value={formData.boatsDefectsData[index]?.observation || ''}
                                        onChange={(e) => {
                                          const updatedData = [...formData.boatsDefectsData];
                                          updatedData[index] = {
                                            ...updatedData[index],
                                            equipment: updatedData[index]?.equipment || '',
                                            observation: e.target.value,
                                            remarks: updatedData[index]?.remarks || ''
                                          };
                                          setFormData(prev => ({ ...prev, boatsDefectsData: updatedData }));
                                        }}
                                        className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                                        placeholder="Enter location"
                                        required
                                      />
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2">
                                      <Input
                                        type="text"
                                        value={formData.boatsDefectsData[index]?.remarks || ''}
                                        onChange={(e) => {
                                          const updatedData = [...formData.boatsDefectsData];
                                          updatedData[index] = {
                                            ...updatedData[index],
                                            equipment: updatedData[index]?.equipment || '',
                                            observation: updatedData[index]?.observation || '',
                                            remarks: e.target.value
                                          };
                                          setFormData(prev => ({ ...prev, boatsDefectsData: updatedData }));
                                        }}
                                        className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                                        placeholder="Enter remarks"
                                        required
                                      />
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* Maintenance of two point lifting hooks row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(f)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Maintenance of two point lifting hooks of Survey Motor Boats. (NO 03/18 refers) (Only For Survey Motor Boats)*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.boatsMaintenanceTwoPointLifting}
                        onValueChange={(value) => handleInputChange('boatsMaintenanceTwoPointLifting', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* Visual examination of Forward and aft lifting hooks row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(i)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Visual examination of Forward and aft lifting hooks arrangement*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.boatsVisualExaminationHooks}
                        onValueChange={(value) => handleInputChange('boatsVisualExaminationHooks', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* DP test of adapter piece row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(ii)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">DP test of adapter piece between the hook and the base plate being carried out annually by refitting authority.*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.boatsDPTestAdapter}
                        onValueChange={(value) => handleInputChange('boatsDPTestAdapter', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* Periodic Inspection and maintenance row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(iii)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Periodic Inspection and maintenance / testing of lifting hook arrangement as stipulated MAINTOP MT- 17023 is carried out by SS.*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.boatsPeriodicInspection}
                        onValueChange={(value) => handleInputChange('boatsPeriodicInspection', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* Visual survey of strong back area row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(iv)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Visual survey of strong back area of hooks, connecting rods, adapter plate, securing bolts, weld joints and GRP Laminate around it.*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.boatsVisualSurveyStrongBack}
                        onValueChange={(value) => handleInputChange('boatsVisualSurveyStrongBack', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* 8.2 Life Rafts Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">8.2</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Life Rafts</span>
                    </td>
                  </tr>

                  {/* Life Rafts Authorisation row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Authorisation*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.lifeRaftsAuthorisation}
                        onChange={(e) => handleInputChange('lifeRaftsAuthorisation', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter authorisation details"
                      />
                    </td>
                  </tr>

                  {/* Life Rafts Held / deficiency row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(b)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Held / deficiency*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.lifeRaftsHeldDeficiency}
                        onChange={(e) => handleInputChange('lifeRaftsHeldDeficiency', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter details"
                      />
                    </td>
                  </tr>

                  {/* Life Rafts BER row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(c)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">BER*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.lifeRaftsBer}
                        onChange={(e) => handleInputChange('lifeRaftsBer', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter BER details"
                      />
                    </td>
                  </tr>

                  {/* Life Rafts Landed for survey row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(d)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Landed for survey*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.lifeRaftsLandedForSurvey}
                        onChange={(e) => handleInputChange('lifeRaftsLandedForSurvey', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter survey details"
                      />
                    </td>
                  </tr>

                  {/* Life Rafts Stowage arrangements row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(e)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Stowage arrangements*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.lifeRaftsStowageArrangements}
                        onChange={(e) => handleInputChange('lifeRaftsStowageArrangements', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter stowage details"
                      />
                    </td>
                  </tr>

                  {/* Life Rafts Hydrostatic releasing gear row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(f)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Hydrostatic releasing gear*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.lifeRaftsHydrostaticReleasingGear}
                        onChange={(e) => handleInputChange('lifeRaftsHydrostaticReleasingGear', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter gear details"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Habitability Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="bg-[#c7d9f0] text-black px-6 py-4">
            <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">Habitability</h3>
          </div>
          
          <div className="pt-4 bg-gray-100 max-h-96 overflow-y-auto">
            <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
              <tbody>
                {/* 9.1 Living conditions */}
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-1/12">
                    <span className="text-sm font-medium text-gray-700">9.1</span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3">
                    <span className="text-sm font-medium text-gray-700">
                      Living conditions<span className="text-red-500">*</span>
                    </span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                    <Select
                      value={formData.livingConditions}
                      onValueChange={(value) => handleInputChange('livingConditions', value)}
                    >
                      <SelectTrigger className="border border-black rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sat">SAT</SelectItem>
                        <SelectItem value="unsat">UNSAT</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>

                {/* 9.2 Ships husbandry */}
                <tr className="bg-white">
                  <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-1/12">
                    <span className="text-sm font-medium text-gray-700">9.2</span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3">
                    <span className="text-sm font-medium text-gray-700">
                      Ships husbandry<span className="text-red-500">*</span>
                    </span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                    <Select
                      value={formData.shipsHusbandry}
                      onValueChange={(value) => handleInputChange('shipsHusbandry', value)}
                    >
                      <SelectTrigger className="border border-black rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sat">SAT</SelectItem>
                        <SelectItem value="unsat">UNSAT</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>

                {/* 9.3 A/C discipline */}
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-1/12">
                    <span className="text-sm font-medium text-gray-700">9.3</span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3">
                    <span className="text-sm font-medium text-gray-700">
                      A/C discipline<span className="text-red-500">*</span>
                    </span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                    <Select
                      value={formData.acDiscipline}
                      onValueChange={(value) => handleInputChange('acDiscipline', value)}
                    >
                      <SelectTrigger className="border border-black rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sat">SAT</SelectItem>
                        <SelectItem value="unsat">UNSAT</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Ships Husbandry tools Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="bg-[#c7d9f0] text-black px-6 py-4">
            <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">Ships Husbandry tools</h3>
          </div>
          
          <div className="pt-4 bg-gray-100 max-h-96 overflow-y-auto">
            <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
              <tbody>
                {/* 10.1 Authorisation of tools */}
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-1/12">
                    <span className="text-sm font-medium text-gray-700">10.1</span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">
                        Authorisation of tools (NHQ policy letter NC/Policy/ H-08/ Equipment dated 22 Aug 12 or amended vide<span className="text-red-500">*</span>
                      </span>
                      <Input
                        type="text"
                        value={formData.authorisationToolsText}
                        onChange={(e) => handleInputChange('authorisationToolsText', e.target.value)}
                        className="border border-black rounded-xl px-3 py-2 w-auto focus:outline-none focus:ring-0"
                      />
                    </div>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                    <Select
                      value={formData.authorisationTools}
                      onValueChange={(value) => handleInputChange('authorisationTools', value)}
                    >
                      <SelectTrigger className="border border-black rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sat">SAT</SelectItem>
                        <SelectItem value="unsat">UNSAT</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>

                {/* 10.2 Held as per Authorisation */}
                <tr className="bg-white">
                  <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-1/12">
                    <span className="text-sm font-medium text-gray-700">10.2</span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3">
                    <span className="text-sm font-medium text-gray-700">
                      Held as per Authorisation<span className="text-red-500">*</span>
                    </span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                    <Select
                      value={formData.heldAsPerAuthorisation}
                      onValueChange={(value) => handleInputChange('heldAsPerAuthorisation', value)}
                    >
                      <SelectTrigger className="border border-black rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sat">SAT</SelectItem>
                        <SelectItem value="unsat">UNSAT</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>

                {/* 10.3 Remark if any */}
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-1/12">
                    <span className="text-sm font-medium text-gray-700">10.3</span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3">
                    <span className="text-sm font-medium text-gray-700">
                      Remark if any<span className="text-red-500">*</span>
                    </span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                    <Input
                      type="text"
                      value={formData.remarkIfAny}
                      onChange={(e) => handleInputChange('remarkIfAny', e.target.value)}
                      className="border border-black rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="bg-[#c7d9f0] text-black px-6 py-4">
            <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">Recommendations</h3>
          </div>
          
          <div className="pt-4 bg-gray-100 max-h-96 overflow-y-auto">
            <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
              <tbody>
                {/* 11.1 SS Recommendations */}
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-1/12">
                    <span className="text-sm font-medium text-gray-700">11.1</span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3">
                    <span className="text-sm font-medium text-gray-700">
                      SS Recommendations :-<span className="text-red-500">*</span>
                    </span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                    <div className="space-y-4">
                      {/* Enter Total Number of Rows */}
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-700">Enter Total Number of Rows.</span>
                        <Input
                          type="number"
                          min="0"
                          value={formData.ssRecommendationsRows}
                          onChange={(e) => handleInputChange('ssRecommendationsRows', parseInt(e.target.value) || 0)}
                          className="w-20 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-0 text-black"
                        />
                      </div>
                      
                      {/* Custom 2-Column Table */}
                      <div className={`${formData.ssRecommendationsRows > 5 ? 'max-h-80 overflow-y-auto' : ''}`}>
                        <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                          <thead className="sticky top-0">
                            <tr className="bg-[#1a2746] text-white">
                              <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Sr No.</th>
                              <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Recommendation<span className="text-red-500">*</span></th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.ssRecommendationsRows === 0 ? (
                              <tr>
                                <td colSpan={2} className="border border-gray-300 px-3 py-8 text-center text-gray-500 italic">
                                  No rows added yet. Increase the count above to add recommendations.
                                </td>
                              </tr>
                            ) : (
                              Array.from({ length: formData.ssRecommendationsRows }, (_, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                                    {String.fromCharCode(97 + index)}
                                  </td>
                                  <td className="border border-gray-300 px-3 py-2">
                                    <Input
                                      type="text"
                                      value={formData.ssRecommendationsData[index]?.observation || ''}
                                      onChange={(e) => {
                                        const updatedData = [...formData.ssRecommendationsData];
                                        updatedData[index] = {
                                          ...updatedData[index],
                                          observation: e.target.value,
                                          remarks: updatedData[index]?.remarks || ''
                                        };
                                        setFormData(prev => ({ ...prev, ssRecommendationsData: updatedData }));
                                      }}
                                      className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                                      placeholder="Enter recommendation"
                                      required
                                    />
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Form Action Buttons */}
        <div className="bg-white p-6 mt-8">
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              className="px-6 py-2 bg-blue-400 text-white font-bold rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleFetchDrafts}
              disabled={isLoadingDrafts}
            >
              {isLoadingDrafts ? 'Loading...' : 'Fetch Drafts'}
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSaveDraft}
              disabled={isSavingDraft}
            >
              {isSavingDraft ? 'Saving...' : 'Save Draft'}
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700 transition-colors"
              onClick={handleClear}
            >
              Clear
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-700 text-white font-bold rounded hover:bg-blue-600 transition-colors"
              onClick={handleSubmit}
            >
              {editingRecord ? 'Update' : 'Save'}
            </button>
          </div>
        </div>

        {/* Drafts Modal */}
        <Dialog open={isDraftModalOpen} onOpenChange={setIsDraftModalOpen}>
          <DialogContent className="max-w-4xl shadow-xl border-0 bg-white p-0 rounded-1xl">
            <DialogHeader className="bg-gradient-to-r from-[#1a2746] to-[#223366] p-4 text-white">
              <DialogTitle className="text-lg font-semibold">Draft Data</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 p-4">
              {apiDrafts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No drafts found.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#1a2746] text-white">
                      <TableHead className="text-white font-bold">Sr No.</TableHead>
                      <TableHead className="text-white font-bold">INS</TableHead>
                      <TableHead className="text-white font-bold">Address</TableHead>
                      <TableHead className="text-white font-bold">Created Date</TableHead>
                      <TableHead className="text-white font-bold">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiDrafts.map((draft, index) => (
                      <TableRow key={draft.id} className={index % 2 === 0 ? "bg-[#f2f2f2]" : "bg-white"}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{draft.vessel?.name || 'N/A'}</TableCell>
                        <TableCell>{draft.auth_inspection || 'No Date Provided'}</TableCell>
                        <TableCell>{new Date(draft.created_on).toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(draft)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(draft.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
            <div className="flex justify-end gap-3 p-4 border-t">
              <Button
                variant="outline"
                onClick={() => setIsDraftModalOpen(false)}
                className="rounded-lg"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default HullMaintenanceInspectionforShipsForm; 
